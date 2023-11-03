'use client'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function TestCheckout() {
    const [clientSecret, setClientSecret] = useState()

    useEffect(() => {
        fetch('/api/checkout_sessions', {
            method: 'POST',
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, [])

    return (
        <>
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    options={{ clientSecret }}
                    stripe={stripePromise}
                >
                    <EmbeddedCheckout className="asd" />
                </EmbeddedCheckoutProvider>
            )}
        </>
    )
}
