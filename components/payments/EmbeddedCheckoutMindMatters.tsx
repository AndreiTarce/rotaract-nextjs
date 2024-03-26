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

export default function EmbeddedCheckoutMindMatters({
    clientSecret,
}: {
    clientSecret: string | undefined
}) {
    const myRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (clientSecret)
            setTimeout(() => {
                myRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                })
            }, 100)
    }, [clientSecret])

    return (
        <div>
            {clientSecret && (
                <div className="rounded-xl overflow-hidden mt-4">
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{ clientSecret }}
                    >
                        <EmbeddedCheckout className="embedded-checkout" />
                    </EmbeddedCheckoutProvider>
                </div>
            )}
            <div ref={myRef}></div>
        </div>
    )
}
