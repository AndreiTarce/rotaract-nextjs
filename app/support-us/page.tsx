import EmbeddedCheckoutForm from '@/components/payments/EmbeddedCheckoutForm'
import { Card } from '@/components/ui/card'

export default function SupportUs() {
    return (
        <main className="mt-5 md:mt-12 mx-24 max-md:mx-4 mb-8">
            <h1 className="w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent mb-4">
                Donează
            </h1>
            <p className="text-muted-foreground md:w-3/4 mb-8">
                Te invităm să fii parte din schimbarea pe care o aducem
                comunității noastre! Prin donația ta, sprijini proiectele
                noastre de caritate și dezvoltare socială, ajutându-ne să facem
                o diferență semnificativă. Donează astăzi și contribuie la un
                viitor mai luminos!
            </p>
            <EmbeddedCheckoutForm />
        </main>
    )
}
