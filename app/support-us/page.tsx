import EmbeddedCheckoutForm from '@/components/payments/EmbeddedCheckoutForm';
import RedirectioneazaImpozit from '@/components/support-us/RedirectioneazaImpozit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Support us | Rotaract Visio Cluj-Napoca',
    description:
        'Te invităm să fii parte din schimbarea pe care o aducem comunității noastre! Prin donația ta, sprijini proiectele noastre de caritate și dezvoltare socială, ajutându-ne să facem o diferență semnificativă. Donează astăzi și contribuie la un viitor mai luminos!',
};

export default function SupportUs() {
    const isTaxRedirectEnabled =
        new Date() < new Date('2025-05-26T00:00:00+03:00');

    return (
        <main className="mx-24 mb-8 mt-5 max-md:mx-4 md:mt-12">
            {isTaxRedirectEnabled ? (
                <RedirectioneazaImpozit />
            ) : (
                <Card className="mb-4 flex grow flex-col rounded-lg border bg-linear-to-tr from-rotaract-cranberry to-rose-500 shadow-md">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-7xl font-extrabold text-white max-md:text-5xl">
                            Donează
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-white">
                            Te invităm să fii parte din schimbarea pe care o
                            aducem comunității noastre! Prin donația ta,
                            sprijini proiectele noastre de caritate și
                            dezvoltare socială, ajutându-ne să facem o diferență
                            semnificativă. Donează astăzi și contribuie la un
                            viitor mai luminos!
                        </p>
                    </CardContent>
                </Card>
            )}

            <EmbeddedCheckoutForm />
        </main>
    );
}
