import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ROTARACT_VISIO_EMAIL } from '@/lib/constants';
import { getCheckoutSession } from '@/lib/entityService';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export default async function Return(props: { searchParams: Promise<{ session_id: string }> }) {
    const searchParams = await props.searchParams;
    const { session_id } = searchParams;

    const session = (await getCheckoutSession(session_id)) as Stripe.Checkout.Session;

    if (session.status === 'open') {
        return redirect('/');
    }

    if (session.status === 'complete')
        return (
            <main className="mx-24 mt-5 mb-8 flex min-h-[58vh] justify-center max-md:mx-4 md:mt-12">
                <Card className="h-fit w-fit">
                    <div className="mt-8 flex justify-center">
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500"
                            size="3x"
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>
                            <h1 className="from-rotaract-cranberry bg-linear-to-r to-rose-500 bg-clip-text p-2 text-center text-5xl leading-none font-extrabold text-transparent max-md:text-2xl">
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
                            Dacă aveți întrebări, vă rugăm să ne contactați la adresa{' '}
                            <a
                                href={`mailto:${ROTARACT_VISIO_EMAIL}`}
                                className="text-muted-foreground"
                            >
                                {ROTARACT_VISIO_EMAIL}
                            </a>
                        </p>
                    </CardContent>
                </Card>
            </main>
        );

    return null;
}
