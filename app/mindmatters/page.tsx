'use client'
import EmbeddedCheckoutMindMatters from '@/components/payments/EmbeddedCheckoutMindMatters'
import {
    MIND_MATTERS_MINDACCESS,
    MIND_MATTERS_MINDFUEL,
} from '@/components/payments/constants'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CHECKOUT_PATH } from '@/lib/constants'
import {
    faAppleWhole,
    faArrowUpRightFromSquare,
    faChalkboardUser,
    faCreditCard,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon } from 'lucide-react'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface IPricingCardProps {
    title: string
    description: string
    recommended?: boolean
    price: number
    lunchIncluded?: boolean
    productId: string
    setPackageChosen: Dispatch<SetStateAction<string | undefined>>
    setProductId: Dispatch<SetStateAction<string>>
}

export default function MindMatters() {
    const [packageChosen, setPackageChosen] = useState<string>()
    const [renderStripeCheckout, setRenderStripeCheckout] =
        useState<boolean>(false)
    const [clientSecret, setClientSecret] = useState<undefined | string>()
    const [productId, setProductId] = useState<string>('')

    const PricingCard = ({
        title,
        description,
        recommended,
        price,
        lunchIncluded,
        productId,
        setPackageChosen,
        setProductId,
    }: IPricingCardProps) => (
        <Card
            className={`w-full h-full flex flex-col items-center p-6 mx-auto text-center text-gray-900 rounded-lg border xl:p-8 dark:text-white ${
                recommended
                    ? 'border-[#48bfe3] dark:border-[#48bfe3] max-md:order-1'
                    : 'border-gray-100 shadow dark:border-gray-600 max-md:order-2'
            }`}
        >
            {recommended && (
                <Badge className="w-fit mb-4">Recomandarea noastră</Badge>
            )}
            <h3 className="mb-4 text-4xl font-semibold">{title}</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                {description}
            </p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                    {price} RON
                </span>
            </div>
            <ul className="flex flex-col gap-2 w-fit">
                <li className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faChalkboardUser} size="1x" />
                    <span>Acces la workshopuri</span>
                </li>
                <li
                    className={`flex space-x-3 items-start ${
                        !lunchIncluded &&
                        'text-muted-foreground line-through text-center'
                    }`}
                >
                    <FontAwesomeIcon icon={faAppleWhole} size="1x" />
                    <span className="text-start max-w-[180px]">
                        Masa de prânz inclusă{' '}
                        {lunchIncluded && (
                            <span className="text-muted-foreground">
                                - asigurată de către partenerul nostru{' '}
                                <Link href="https://nutriento.ro/">
                                    <b>
                                        nutriento{' '}
                                        <FontAwesomeIcon
                                            icon={faArrowUpRightFromSquare}
                                            size="xs"
                                        />
                                    </b>
                                </Link>
                            </span>
                        )}
                    </span>
                </li>
            </ul>
            <div className="h-full w-full flex justify-end items-end mt-8">
                <Button
                    className="font-semibold w-full bg-[#48bfe3] text-base"
                    onClick={() => {
                        setPackageChosen(title)
                        setProductId(productId)
                    }}
                >
                    Înscriere
                </Button>
            </div>
        </Card>
    )

    return (
        <main className="mt-5 md:mt-12 mx-24 max-md:mx-4 mb-8">
            <div className="flex flex-col items-center">
                <p className="text-8xl font-extrabold max-md:text-6xl leading-none mb-4">
                    Pachete
                </p>
                <p className="text-5xl font-extrabold max-md:text-3xl leading-none bg-gradient-to-r from-[#48bfe3] to-[#44afd0] bg-clip-text text-transparent mb-4 text-center">
                    Healthy Vision: Mind Matters
                </p>
                <p className="text-muted-foreground text-center">
                    Toți banii strânși vor fi donați către{' '}
                    <Link
                        href={
                            'about?cause=Școala+Gimnazială+"Iuliu+Hațieganu"+Panticeu'
                        }
                    >
                        <b>cauza proiectului </b>
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            size="xs"
                        />
                    </Link>
                </p>
                {!packageChosen && (
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2 gap-8 md:gap-8 mt-12">
                        <PricingCard
                            title="MindAccess"
                            description="Pachet redus"
                            price={100}
                            productId={MIND_MATTERS_MINDACCESS}
                            setPackageChosen={setPackageChosen}
                            setProductId={setProductId}
                        />
                        <PricingCard
                            title="MindFuel"
                            description="Pachet standard"
                            recommended
                            price={130}
                            lunchIncluded
                            productId={MIND_MATTERS_MINDFUEL}
                            setPackageChosen={setPackageChosen}
                            setProductId={setProductId}
                        />
                    </div>
                )}
            </div>
            {packageChosen && !renderStripeCheckout && (
                <div className="flex justify-center mt-12">
                    <Card className="w-full max-w-xl shadow-md border rounded-lg">
                        <CardHeader>
                            <CardTitle>
                                Mai avem nevoie doar de câteva date
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CheckoutForm
                                packageChosen={packageChosen}
                                setRenderStripeCheckout={() =>
                                    setRenderStripeCheckout(true)
                                }
                                setClientSecret={setClientSecret}
                                productId={productId}
                            />
                        </CardContent>
                    </Card>
                </div>
            )}
            {renderStripeCheckout && !clientSecret && (
                <div role="status" className="flex w-full justify-center mt-12">
                    <svg
                        aria-hidden="true"
                        className="w-48 h-48 text-gray-200 animate-spin dark:text-gray-600 fill-[#48bfe3]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            {renderStripeCheckout && (
                <EmbeddedCheckoutMindMatters clientSecret={clientSecret} />
            )}
        </main>
    )
}

const formSchema = z.object({
    first_name: z.string().min(1, {
        message: 'First name is required.',
    }),
    last_name: z.string().min(1, {
        message: 'Last name is required.',
    }),
    email: z.string().min(1, { message: 'Email is required' }).email({
        message: 'Email must be valid. (e.g. example@gmail.com)',
    }),
    phone_number: z.string().min(1, { message: 'Phone number is required' }),
    package: z.string(),
})

export type CheckoutFormSchema = z.infer<typeof formSchema>

interface CheckoutFormProps {
    packageChosen: string
    setRenderStripeCheckout: Dispatch<SetStateAction<boolean>>
    setClientSecret: Dispatch<SetStateAction<string | undefined>>
    productId: string
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    packageChosen,
    setRenderStripeCheckout,
    setClientSecret,
    productId,
}) => {
    const [loading, setLoading] = useState<boolean>(false)

    const checkoutStatuses = {
        loading: 'loading',
        submitted: 'submitted',
        error: 'error',
    }

    const [status, setStatus] = useState('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            package: packageChosen,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const abortLongFetch = new AbortController()
        const abortTimeoutId = setTimeout(() => abortLongFetch.abort(), 7000)

        setStatus(checkoutStatuses.loading)

        fetch('/api/mindmatters', {
            signal: abortLongFetch.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => {
                if (res.ok) {
                    clearTimeout(abortTimeoutId)
                    return res.json()
                }
                throw new Error('Whoops! Error sending email.')
            })
            .then((res) => {
                setStatus(checkoutStatuses.submitted)
                setRenderStripeCheckout(true)
                getCheckoutSession(productId, 1, 'payment', values.email)
            })
            .catch((err) => {
                setStatus(checkoutStatuses.error)
            })
    }

    const getCheckoutSession = async (
        price: string,
        quantity: number,
        mode: string,
        email?: string,
        interval?: string,
        currency?: string
    ) => {
        setClientSecret(undefined)
        setLoading(true)
        fetch(CHECKOUT_PATH, {
            method: 'POST',
            body: JSON.stringify({
                price: price,
                quantity: quantity,
                mode: mode,
                interval: interval,
                currency: currency,
                customer_email: email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                setLoading(false)
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Prenume</FormLabel>
                            <FormControl>
                                <Input placeholder="Prenumele tău" {...field} />
                            </FormControl>
                            {form.formState.errors.first_name && (
                                <FormDescription className="text-destructive">
                                    <span className="flex gap-2">
                                        <AlertOctagon size={20} />
                                        {
                                            form.formState.errors.first_name
                                                ?.message
                                        }
                                    </span>
                                </FormDescription>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Nume</FormLabel>
                            <FormControl>
                                <Input placeholder="Numele tău" {...field} />
                            </FormControl>
                            {form.formState.errors.last_name && (
                                <FormDescription className="text-destructive">
                                    <span className="flex gap-2">
                                        <AlertOctagon size={20} />
                                        {
                                            form.formState.errors.last_name
                                                ?.message
                                        }
                                    </span>
                                </FormDescription>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Adresa ta de email"
                                    {...field}
                                />
                            </FormControl>
                            {form.formState.errors.email && (
                                <FormDescription className="text-destructive">
                                    <span className="flex gap-2">
                                        <AlertOctagon size={20} />
                                        {form.formState.errors.email?.message}
                                    </span>
                                </FormDescription>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Număr de telefon</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Adresa ta de email"
                                    {...field}
                                />
                            </FormControl>
                            {form.formState.errors.phone_number && (
                                <FormDescription className="text-destructive">
                                    <span className="flex gap-2">
                                        <AlertOctagon size={20} />
                                        {
                                            form.formState.errors.phone_number
                                                ?.message
                                        }
                                    </span>
                                </FormDescription>
                            )}
                        </FormItem>
                    )}
                />
                <div className="flex w-full justify-end">
                    <Button type="submit">
                        {status === checkoutStatuses.loading ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                                className="animate-spin mr-2 fill-white dark:fill-dark"
                            >
                                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                            </svg>
                        ) : (
                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className="mr-2"
                            />
                        )}
                        Continuă spre plată
                    </Button>
                </div>
            </form>
        </Form>
    )
}
