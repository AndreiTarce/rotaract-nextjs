import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getCheckoutSession } from '@/lib/entityService'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

export default async function Return({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {
    const { session_id } = searchParams

    const { session }: { session: Stripe.Checkout.Session } =
        await getCheckoutSession(session_id)

    if (session.status === 'open') {
        return redirect('/')
    }

    if (session.status === 'complete')
        return (
            <main className="mt-5 md:mt-12 mx-24 max-md:mx-4 mb-8 flex justify-center min-h-[58vh]">
                <Card className="w-fit h-fit">
                    <div className="flex justify-center mt-8">
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500"
                            size="3x"
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-5xl font-extrabold max-md:text-2xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent p-2 text-center">
                                Vă mulțumim pentru donație!
                            </h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <p>
                            Un email de confirmare va fi trimis către{' '}
                            {session.customer_details?.email}.
                        </p>
                        <Separator className="my-2" />
                        <p>
                            Dacă aveți întrebări, vă rugăm să ne contactați la
                            adresa{' '}
                            <a
                                href="mailto:rotaractvisiocluj@gmail.com"
                                className="text-muted-foreground"
                            >
                                rotaractvisiocluj@gmail.com
                            </a>
                        </p>
                    </CardContent>
                </Card>
            </main>
        )

    return null
}
