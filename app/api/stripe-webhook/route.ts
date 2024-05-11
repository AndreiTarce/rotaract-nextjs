import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const endpointSecret = 'whsec_NvJvUrhBKOElor0N6f0XhClzPwoCo7DM'

export async function POST(request: NextRequest, response: NextResponse) {
    const body = await request.text()

    const sig = request.headers.get('stripe-signature')

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig as string,
            endpointSecret
        )
    } catch (err) {
        return NextResponse.json(
            { error: `Webhook Error: ${err}` },
            { status: 400 }
        )
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSession = event.data.object
            console.log(checkoutSession)
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ status: 200 })
}
