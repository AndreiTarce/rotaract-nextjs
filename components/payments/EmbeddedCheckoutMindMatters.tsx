'use client';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useRef } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function EmbeddedCheckoutMindMatters({
    clientSecret,
}: {
    clientSecret: string | undefined;
}) {
    const myRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (clientSecret)
            setTimeout(() => {
                myRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            }, 300);
    }, [clientSecret]);

    return (
        <div>
            {clientSecret && (
                <div className="relative mt-4 w-full overflow-hidden rounded-xl">
                    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                        <EmbeddedCheckout className="embedded-checkout w-full" />
                    </EmbeddedCheckoutProvider>
                </div>
            )}
            <div ref={myRef}></div>
        </div>
    );
}
