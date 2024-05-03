import { NextRequest, NextResponse } from 'next/server'
import { buffer } from 'stream/consumers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const endpointSecret =
    'whsec_e42a0ea000c076f5b92dafb1574bc98dc44f9d2341105289cc670da525104722'

export async function POST(request: NextRequest, response: NextResponse) {
    const body = await request.json()
    console.log(body)
    const buf = await buffer(body)

    const sig = request.headers.get('stripe-signature')

    let event

    try {
        event = stripe.webhooks.constructEvent(
            buf,
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
