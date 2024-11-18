import connectMongoDB from '@/lib/mongodb';
import CatrafusaleRegistration from '@/models/catrafusaleRegistration';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
    confirmCatrafusale2024WinterEditionRegistrationPayment,
    handleFlashSaleActive,
    handleRaffleTicketSale,
} from './catrafusale/logic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

export async function POST(request: NextRequest, response: NextResponse) {
    await connectMongoDB();
    const body = await request.text();

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

            console.log(checkoutSession);

            if (checkoutSession.metadata?.catrafusale_registration === 'true') {
                await CatrafusaleRegistration.findOneAndUpdate(
                    {
                        checkout_session_id: checkoutSession.id,
                    },
                    { paid: true }
                );

                await handleFlashSaleActive(checkoutSession);
            }

            if (checkoutSession.metadata?.catrafusale_raffle === 'true') {
                //add tickets to db
                //send client ticket numbers through email
                await handleRaffleTicketSale(checkoutSession);
            }

            if (
                checkoutSession.metadata?.catrafusale_2024_winter_edition ===
                'true'
            ) {
                await confirmCatrafusale2024WinterEditionRegistrationPayment(
                    checkoutSession
                );
            }

            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ status: 200 });
}
