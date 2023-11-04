'use client'
import { CHECKOUT_PATH } from '@/lib/constants'
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function EmbeddedCheckoutForm() {
    const [clientSecret, setClientSecret] = useState()
    const [loading, setLoading] = useState(false)
    const myRef = useRef(null)

    const getCheckoutSession = async (
        price: string,
        quantity: number,
        mode: string
    ) => {
        setClientSecret(undefined)
        setLoading(true)
        fetch(CHECKOUT_PATH, {
            method: 'POST',
            body: JSON.stringify({
                price: price,
                quantity: quantity,
                mode: mode,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                setLoading(false)
            })
    }

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
        <div className="">
            <div className="mb-8">
                <Button
                    onClick={() =>
                        getCheckoutSession(
                            'price_1O8OR1H1rXnXzXAphxmN3uIh',
                            1,
                            'payment'
                        )
                    }
                >
                    test1
                </Button>
                <Button
                    onClick={() =>
                        getCheckoutSession(
                            'price_1O8qR1H1rXnXzXAp0L7rLSUk',
                            1,
                            'subscription'
                        )
                    }
                >
                    test2
                </Button>
            </div>
            {loading && <>loading</>}
            {clientSecret && (
                <div className="rounded-xl overflow-hidden">
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
