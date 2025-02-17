'use client';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function EmbeddedCheckoutCatrafusale({ clientSecret }: { clientSecret: string }) {
    return (
        <>
            <div className="mt-4 w-full overflow-hidden rounded-xl">
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                    <EmbeddedCheckout className="embedded-checkout w-full" />
                </EmbeddedCheckoutProvider>
            </div>
        </>
    );
}
