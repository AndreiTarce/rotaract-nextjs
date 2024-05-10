'use client'
import {
    faBuildingColumns,
    faBullseye,
    faCalendarCheck,
    faClipboard,
    faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Toaster } from '../ui/toaster'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'
import { useToast } from '../ui/use-toast'
import DonateButton from './DonateButton'
import {
    STRIPE_CATRAFUSALE_DONATION,
    STRIPE_GHIOZDANOK_DONATION,
    STRIPE_HEALTHYVISION_DONATION,
    STRIPE_RECURRING_DONATION,
    STRIPE_SIMPLE_DONATION,
    STRIPE_VEDEREDECRACIUN_DONATION,
} from './constants'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function EmbeddedCheckoutForm() {
    const [clientSecret, setClientSecret] = useState<undefined | string>()
    const myRef = useRef<null | HTMLDivElement>(null)
    const { toast } = useToast()

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
            <div className="md:grid md:grid-cols-2 flex flex-col gap-4">
                <Card className="shadow-md border rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg">
                            Donație simplă
                        </CardTitle>
                        <FontAwesomeIcon
                            icon={faHandHoldingDollar}
                            className="h-4 w-4 text-muted-foreground"
                        />
                    </CardHeader>
                    <CardContent className="text-muted-foreground flex flex-col">
                        <div className="mb-4">
                            Vom aloca această donație către un proiect din
                            cadrul clubului care necesită finanțare.
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            <DonateButton
                                price={STRIPE_SIMPLE_DONATION[0]}
                                quantity={1}
                                mode="payment"
                                setClientSecret={setClientSecret}
                            >
                                20 RON
                            </DonateButton>
                            <DonateButton
                                price={STRIPE_SIMPLE_DONATION[1]}
                                quantity={1}
                                mode="payment"
                                setClientSecret={setClientSecret}
                            >
                                50 RON
                            </DonateButton>
                            <DonateButton
                                price={STRIPE_SIMPLE_DONATION[2]}
                                quantity={1}
                                mode="payment"
                                setClientSecret={setClientSecret}
                            >
                                100 RON
                            </DonateButton>
                            <DonateButton
                                price={STRIPE_SIMPLE_DONATION[3]}
                                quantity={1}
                                mode="payment"
                                setClientSecret={setClientSecret}
                            >
                                Altă valoare
                            </DonateButton>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-md border rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg">
                            Donație recurentă
                        </CardTitle>
                        <FontAwesomeIcon
                            icon={faCalendarCheck}
                            className="h-4 w-4 text-muted-foreground"
                        />
                    </CardHeader>
                    <CardContent className="text-muted-foreground flex flex-col">
                        <div className="mb-4">
                            Vrei să ne susții constant eforturile? Ai opțiunea
                            de a activa o donație recurentă lunar.
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            <DonateButton
                                price={STRIPE_RECURRING_DONATION[0]}
                                quantity={1}
                                mode="subscription"
                                setClientSecret={setClientSecret}
                            >
                                20 RON
                            </DonateButton>
                            <DonateButton
                                price={STRIPE_RECURRING_DONATION[1]}
                                quantity={1}
                                mode="subscription"
                                setClientSecret={setClientSecret}
                            >
                                50 RON
                            </DonateButton>
                            <DonateButton
                                price={STRIPE_RECURRING_DONATION[2]}
                                quantity={1}
                                mode="subscription"
                                setClientSecret={setClientSecret}
                            >
                                100 RON
                            </DonateButton>
                            <DonateButton
                                price={STRIPE_RECURRING_DONATION[3]}
                                quantity={1}
                                mode="payment"
                                setClientSecret={setClientSecret}
                            >
                                Altă valoare
                            </DonateButton>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-md border rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg">
                            Donație specifică{' '}
                        </CardTitle>
                        <FontAwesomeIcon
                            icon={faBullseye}
                            className="h-4 w-4 text-muted-foreground"
                        />
                    </CardHeader>
                    <CardContent className="text-muted-foreground flex flex-col">
                        <div className="mb-4">
                            Vrei să susții un proiect anume? Donează acum iar
                            noi vom aloca această donație către următoarea
                            ediție a proiectului.
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            <DonateButton
                                price={STRIPE_GHIOZDANOK_DONATION}
                                quantity={1}
                                mode="payment"
                                setClientSecret={setClientSecret}
                            >
                                GhiozdănOK
                            </DonateButton>
                            <DonateButton
                                price={STRIPE_VEDEREDECRACIUN_DONATION}
                                quantity={1}
                                mode="payment"
                                setClientSecret={setClientSecret}
                            >
                                Vedere de Crăciun
                            </DonateButton>
                            <DonateButton
                                price={STRIPE_CATRAFUSALE_DONATION}
                                quantity={1}
                                mode="payment"
                                setClientSecret={setClientSecret}
                            >
                                CATRAFU-SALE
                            </DonateButton>
                            <DonateButton
                                price={STRIPE_HEALTHYVISION_DONATION}
                                quantity={1}
                                mode="payment"
                                setClientSecret={setClientSecret}
                            >
                                Healthy Vision
                            </DonateButton>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-md border rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg">Cont bancar</CardTitle>
                        <FontAwesomeIcon
                            icon={faBuildingColumns}
                            className="h-4 w-4 text-muted-foreground"
                        />
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        <p>
                            <span className="font-semibold">Nume: </span>
                            Asociația Rotaract Visio Cluj-Napoca
                        </p>
                        <p>
                            <span className="font-semibold">CIF: </span>
                            33329540
                        </p>
                        <p
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    'RO29BTRLRONCRT0662749501'
                                )
                                toast({
                                    title: 'Copied to clipboard',
                                    description: 'RO29BTRLRONCRT0662749501',
                                    duration: 1000,
                                })
                            }}
                            className="hover:cursor-pointer"
                        >
                            <span className="font-semibold">IBAN: </span>
                            RO29BTRLRONCRT0662749501{' '}
                            <TooltipProvider>
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <FontAwesomeIcon
                                            icon={faClipboard}
                                            className="ml-1"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Copy to clipboard
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </p>
                    </CardContent>
                </Card>
            </div>
            {clientSecret && (
                <div className="rounded-xl overflow-hidden mt-4">
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{ clientSecret }}
                    >
                        <EmbeddedCheckout className="embedded-checkout" />
                    </EmbeddedCheckoutProvider>
                </div>
            )}
            <div ref={myRef}></div>
            <Toaster />
        </div>
    )
}
