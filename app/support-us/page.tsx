import EmbeddedCheckoutForm from '@/components/payments/EmbeddedCheckoutForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SupportUs() {
    return (
        <main className="mt-5 md:mt-12 mx-24 max-md:mx-4 mb-8">
            <Card className="bg-gradient-to-tr from-rotaract-cranberry to-rose-500 shadow-md border rounded-lg grow flex flex-col mb-4">
                <CardHeader className="pb-4">
                    <CardTitle className="text-7xl font-extrabold max-md:text-5xl text-white">
                        Donează
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-white">
                        Te invităm să fii parte din schimbarea pe care o aducem
                        comunității noastre! Prin donația ta, sprijini
                        proiectele noastre de caritate și dezvoltare socială,
                        ajutându-ne să facem o diferență semnificativă. Donează
                        astăzi și contribuie la un viitor mai luminos!
                    </p>
                </CardContent>
            </Card>
            <EmbeddedCheckoutForm />
        </main>
    )
}
