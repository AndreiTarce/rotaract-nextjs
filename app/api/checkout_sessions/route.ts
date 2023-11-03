import { NextRequest, NextResponse } from "next/server";
import { Stripe } from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1O8OR1H1rXnXzXAphxmN3uIh',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            return_url: `${request.nextUrl.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
            payment_method_configuration: 'pmc_1O8OgEH1rXnXzXApHjkFOccf'
        });

        return NextResponse.json({ clientSecret: session.client_secret }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function GET(request: NextRequest, response: NextResponse) {
    const session_id = request.nextUrl.searchParams.get('session_id');
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id as string);

        return NextResponse.json({ session }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}