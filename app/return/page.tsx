import { getCheckoutSession } from '@/lib/entityService'
import Stripe from 'stripe'

export default async function Return({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {
    const { session_id } = searchParams

    const { session }: { session: Stripe.Checkout.Session } =
        await getCheckoutSession(session_id)

    console.log(session)

    return (
        <main className="mt-5 md:mt-12 mx-24 max-md:mx-4 mb-8 ">
            return
            <p>{session.customer_details?.email}</p>
            <p>{session.invoice?.toString()}</p>
        </main>
    )
}
