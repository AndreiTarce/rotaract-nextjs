'use client'
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useRef } from 'react'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function EmbeddedCheckoutCatrafusale({
    clientSecret,
}: {
    clientSecret: string
}) {
    return (
        <>
            <div className="rounded-xl overflow-hidden mt-4 w-full">
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout className="embedded-checkout w-full" />
                </EmbeddedCheckoutProvider>
            </div>
        </>
    )
}
