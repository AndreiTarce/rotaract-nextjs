import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const endpointSecret =
    'whsec_e42a0ea000c076f5b92dafb1574bc98dc44f9d2341105289cc670da525104722'

export async function POST(request: NextRequest, response: NextResponse) {
    const body = await request.json()
    console.log(body)

    const sig = request.headers.get('stripe-signature')

    let event

    try {
        event = stripe.webhooks.constructEvent(
            JSON.stringify(body),
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
    console.log(`Unhandled event type ${event.type}`)

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ status: 200 })
}
