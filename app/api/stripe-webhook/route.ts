import { CATRAFUSALE_PACKAGES } from '@/components/payments/constants';
import { CatrafusaleFlashSaleEmail } from '@/emails/catrafusale-flash-sale';
import connectMongoDB from '@/lib/mongodb';
import CatrafusaleRegistration from '@/models/catrafusaleRegistration';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmail } from '../utils/send-email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

export async function POST(request: NextRequest, response: NextResponse) {
    const body = await request.text();
    await connectMongoDB();

    const sig = request.headers.get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig as string,
            endpointSecret as string
        );
    } catch (err) {
        return NextResponse.json(
            { error: `Webhook Error: ${err}` },
            { status: 400 }
        );
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSession = event.data.object;
            if (checkoutSession.metadata?.catrafusale_registration === 'true') {
                await CatrafusaleRegistration.findOneAndUpdate(
                    {
                        checkout_session_id: checkoutSession.id,
                    },
                    { paid: true }
                );

                await handleFlashSaleActive(checkoutSession);
            }

            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ status: 200 });
}

const handleFlashSaleActive = async (
    checkoutSession: Stripe.Checkout.Session
) => {
    if (
        isFlashSaleActive() &&
        !checkoutSession.total_details?.amount_discount
    ) {
        const promotionCode = await createPromoCode(checkoutSession);
        await sendPromoCodeEmailToClient(checkoutSession, promotionCode);
        await CatrafusaleRegistration.findOneAndUpdate(
            {
                checkout_session_id: checkoutSession.id,
            },
            {
                oneplusone: true,
            }
        );
    }
};

export const isFlashSaleActive = () => {
    const today = new Date();
    const flashSaleStartDate = new Date(2024, 5 - 1, 24, 0, 1, 0);
    const flashSaleEndDate = new Date(2024, 5 - 1, 24, 23, 59, 0);
    return flashSaleStartDate < today && today < flashSaleEndDate;
};

const sendPromoCodeEmailToClient = async (
    checkoutSession: Stripe.Checkout.Session,
    promotionCode: Stripe.PromotionCode
) => {
    console.log(
        'no promo code used, and the flash sale is active, so send them a promo code'
    );
    await sendEmail({
        to: [checkoutSession.customer_email as string],
        subject: 'CATRAFU-SALE 1+1 Gratis',
        react: CatrafusaleFlashSaleEmail(promotionCode),
    });
};

const createPromoCode = async (checkoutSession: Stripe.Checkout.Session) => {
    const productsArray = generateCouponProductsArray(
        checkoutSession.metadata?.productId as string
    );

    const coupon = await stripe.coupons.create({
        duration: 'once',
        percent_off: 100,
        applies_to: { products: [...productsArray] },
    });

    const promotionCode = await stripe.promotionCodes.create({
        coupon: coupon.id,
    });

    return promotionCode;
};

const generateCouponProductsArray = (productId: string) => {
    const array: string[] = [
        CATRAFUSALE_PACKAGES.SINGLE_TABLE,
        CATRAFUSALE_PACKAGES.SINGLE,
        CATRAFUSALE_PACKAGES.DOUBLE,
        CATRAFUSALE_PACKAGES.MIXT,
    ];

    switch (productId) {
        case CATRAFUSALE_PACKAGES.MIXT:
            return array;
        case CATRAFUSALE_PACKAGES.DOUBLE:
            return array.slice(0, 3);
        case CATRAFUSALE_PACKAGES.SINGLE:
            return array.slice(0, 2);
        case CATRAFUSALE_PACKAGES.SINGLE_TABLE:
            return array.slice(0, 1);
        default:
            return array;
    }
};
