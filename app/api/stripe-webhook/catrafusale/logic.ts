import { CATRAFUSALE_PACKAGES } from '@/components/payments/constants';
import CatrafusaleRaffleRegistration, {
    ICatrafusaleRaffleRegistration,
} from '@/models/catrafusaleRaffleRegistration';
import CatrafusaleRegistration from '@/models/catrafusaleRegistration';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const handleFlashSaleActive = async (
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
    today.setTime(today.getTime() + 60 * 60 * 1000 * 3);
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
        'prod_Q5SYEz5tybmAdB',
        'prod_Q5SXOBffiHzTP1',
        'prod_Q5SYu9I7Q0HSdU',
        'prod_Q5SZGjvZ8MEtZe',
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

export const handleRaffleTicketSale = async (
    checkoutSession: Stripe.Checkout.Session
) => {
    const raffleRegistrations: ICatrafusaleRaffleRegistration[] =
        await CatrafusaleRaffleRegistration.find();

    const raffleRegistration = await createNewRaffleRegistration(
        checkoutSession,
        raffleRegistrations
    );
};

const createNewRaffleRegistration = async (
    checkoutSession: Stripe.Checkout.Session,
    raffleRegistrations: ICatrafusaleRaffleRegistration[]
) => {
    const ticketsBought = (checkoutSession.amount_total as number) / 1000;

    if (!raffleRegistrations.length) {
        const succesfullRaffleRegistration = await createFirstRaffleTicket(
            checkoutSession,
            ticketsBought
        );
        return succesfullRaffleRegistration;
    }

    const succesfullRaffleRegistration = await createRaffleTicket(
        checkoutSession,
        raffleRegistrations,
        ticketsBought
    );
    return succesfullRaffleRegistration;
};

const createFirstRaffleTicket = async (
    checkoutSession: Stripe.Checkout.Session,
    ticketsBought: number
) => {
    const raffleRegistration: ICatrafusaleRaffleRegistration = {
        email: checkoutSession.customer_details?.email as string,
        name: checkoutSession.customer_details?.name as string,
        phone_number: checkoutSession.customer_details?.phone as string,
        tickets: ticketsBought,
        ticket_numbers: { start: 1001, end: 1000 + ticketsBought },
    };
    const successfulRegistration =
        await CatrafusaleRaffleRegistration.create(raffleRegistration);
    return successfulRegistration;
};

const createRaffleTicket = async (
    checkoutSession: Stripe.Checkout.Session,
    raffleRegistrations: ICatrafusaleRaffleRegistration[],
    ticketsBought: number
) => {
    const lastRaffleTicket =
        raffleRegistrations[raffleRegistrations.length - 1].ticket_numbers.end;

    const raffleRegistration: ICatrafusaleRaffleRegistration = {
        email: checkoutSession.customer_details?.email as string,
        name: checkoutSession.customer_details?.name as string,
        phone_number: checkoutSession.customer_details?.phone as string,
        tickets: ticketsBought,
        ticket_numbers: {
            start: lastRaffleTicket + 1,
            end: lastRaffleTicket + ticketsBought,
        },
    };

    const successfulRegistration =
        await CatrafusaleRaffleRegistration.create(raffleRegistration);
    return successfulRegistration;
};
