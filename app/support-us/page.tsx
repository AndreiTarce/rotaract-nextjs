import EmbeddedCheckoutForm from '@/components/payments/EmbeddedCheckoutForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-md border rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg">
                            Donație simplă
                        </CardTitle>
                        <FontAwesomeIcon
                            icon={faAccessibleIcon}
                            className="h-4 w-4 text-muted-foreground"
                        />
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        card content
                    </CardContent>
                </Card>
                <Card className="shadow-md border rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg">Donatie </CardTitle>
                        <FontAwesomeIcon
                            icon={faAccessibleIcon}
                            className="h-4 w-4 text-muted-foreground"
                        />
                    </CardHeader>
                    <CardContent>card content</CardContent>
                </Card>
                <Card className="shadow-md border rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg">Donatie </CardTitle>
                        <FontAwesomeIcon
                            icon={faAccessibleIcon}
                            className="h-4 w-4 text-muted-foreground"
                        />
                    </CardHeader>
                    <CardContent>card content</CardContent>
                </Card>
            </div>
            <EmbeddedCheckoutForm />
        </main>
    )
}
