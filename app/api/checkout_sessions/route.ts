import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
    const body = await request.json();
    try {
        // Create Checkout Sessions from body params.
        const sessionObject: Stripe.Checkout.SessionCreateParams = {
            ui_mode: 'embedded',
            metadata: body.metadata || {},
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: body.price,
                    quantity: body.quantity,
                },
            ],
            mode: body.mode,
            return_url: `${request.nextUrl.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
            customer_email: body.customer_email || undefined,
            phone_number_collection: {
                enabled: body.phone_number_collection || false,
            },
        };
        if (sessionObject.mode !== 'subscription') {
            sessionObject.submit_type = 'donate';
        }
        if (body.adjustable_quantity && sessionObject.line_items) {
            sessionObject.line_items[0].adjustable_quantity = { enabled: true };
        }
        if (body.allow_promotion_codes) {
            sessionObject.allow_promotion_codes = true;
        }
        if (body.custom_fields) {
            sessionObject.custom_fields = [...body.custom_fields];
        }
        const session = await stripe.checkout.sessions.create(sessionObject);

        return NextResponse.json({ ...session }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const session_id = request.nextUrl.searchParams.get('session_id');
    try {
        const session = await stripe.checkout.sessions.retrieve(
            session_id as string
        );

        return NextResponse.json(session, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
