'use client';

import { ICatrafusaleWorkshopRegistrationWinter2024 } from '@/interfaces/registration/ICatrafusaleRegistration2024Winter';
import { CHECKOUT_PATH } from '@/lib/constants';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertOctagon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Stripe from 'stripe';
import { z } from 'zod';
import EmbeddedCheckoutCatrafusale from '../payments/EmbeddedCheckoutCatrafusale';
import { getStripePrices } from '../payments/constants';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { CatrafusaleWorkshopProps } from './CatrafusaleWorkshop';

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
    package: z.object({
        name: z.string(),
        id: z.number(),
        productId: z.string(),
    }),
    agree_to_terms_and_conditions: z.boolean().default(false),
});

export type CatrafusaleFormSchema = z.infer<typeof formSchema>;

export const CatrafusaleWorkshopRegistrationForm = (props: CatrafusaleWorkshopProps) => {
    const [clientSecret, setClientSecret] = useState<string | null>();
    const [loading, setLoading] = useState(false);
    const { CATRAFUSALE_2024_WINTER_WORKSHOPS } = getStripePrices();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            agree_to_terms_and_conditions: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        const registration = {
            ...values,
            package: values.package.name,
            payment_confirmed: false,
            checkout_session_id: '',
        };

        const checkoutSession = await getCheckoutSession(
            values.package.productId,
            1,
            'payment',
            registration.email,
            {
                catrafusale_workshop_2024_winter_edition: true,
                productId: values.package.productId,
            },
            values.package.productId
        );

        registration.checkout_session_id = checkoutSession.id;
        sendRegistration(registration);
        setLoading(false);
        setClientSecret(checkoutSession.client_secret);
    };

    const sendRegistration = async (registration: ICatrafusaleWorkshopRegistrationWinter2024) => {
        const abortLongFetch = new AbortController();
        const abortTimeoutId = setTimeout(() => abortLongFetch.abort(), 7000);
        try {
            const response = await fetch('/api/catrafusale_workshop', {
                signal: abortLongFetch.signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registration),
            });
            clearTimeout(abortTimeoutId);
        } catch (error) {
            console.log(error);
        }
    };

    const getCheckoutSession = async (
        price: string,
        quantity: number,
        mode: string,
        email?: string,
        metadata?: object,
        interval?: string,
        currency?: string
    ) =>
        fetch(CHECKOUT_PATH, {
            method: 'POST',
            body: JSON.stringify({
                price: price,
                quantity: quantity,
                mode: mode,
                interval: interval,
                currency: currency,
                customer_email: email,
                allow_promotion_codes: true,
                metadata: metadata,
            }),
        })
            .then((res) => res.json())
            .then((data: Stripe.Checkout.Session) => {
                return data;
            });

    const isPackageDisabled = (productId: string) => {
        switch (productId) {
            case CATRAFUSALE_2024_WINTER_WORKSHOPS[0].productId:
                return !Boolean(props.remainingCandles);
            case CATRAFUSALE_2024_WINTER_WORKSHOPS[1].productId:
                return !Boolean(props.remainingGlobes);
            case CATRAFUSALE_2024_WINTER_WORKSHOPS[2].productId:
                return !Boolean(props.remainingClay);
        }
    };

    if (clientSecret) return <EmbeddedCheckoutCatrafusale clientSecret={clientSecret} />;

    const updatePackage = (productId: string) => {
        switch (productId) {
            case CATRAFUSALE_2024_WINTER_WORKSHOPS[0].productId:
                return form.setValue('package', CATRAFUSALE_2024_WINTER_WORKSHOPS[0]);
            case CATRAFUSALE_2024_WINTER_WORKSHOPS[1].productId:
                return form.setValue('package', CATRAFUSALE_2024_WINTER_WORKSHOPS[1]);
            case CATRAFUSALE_2024_WINTER_WORKSHOPS[2].productId:
                return form.setValue('package', CATRAFUSALE_2024_WINTER_WORKSHOPS[2]);
        }
    };

    const getPackagePrice = (productId: string) => {
        switch (productId) {
            case CATRAFUSALE_2024_WINTER_WORKSHOPS[0].productId:
                return 35;
            case CATRAFUSALE_2024_WINTER_WORKSHOPS[1].productId:
                return 25;
            case CATRAFUSALE_2024_WINTER_WORKSHOPS[2].productId:
                return 60;
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="package"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Atelier</FormLabel>
                            <Select onValueChange={(productId) => updatePackage(productId)}>
                                <FormControl>
                                    <SelectTrigger className="dark:bg-foreground h-9 w-fit border-none">
                                        <SelectValue placeholder="Alege atelierul la care vrei să participi" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="dark:bg-foreground dark:text-card border-none">
                                    <SelectGroup>
                                        {CATRAFUSALE_2024_WINTER_WORKSHOPS.map((workshop) => (
                                            <SelectItem
                                                disabled={isPackageDisabled(workshop.productId)}
                                                value={workshop.productId}
                                                key={workshop.id}
                                            >
                                                {workshop.name}{' '}
                                                {isPackageDisabled(workshop.productId)
                                                    ? ' - SOLD OUT'
                                                    : ` - ${getPackagePrice(workshop.productId)} RON`}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Prenume</FormLabel>
                            <FormControl className="dark:bg-foreground border-none">
                                <Input placeholder="Prenumele tău" {...field} />
                            </FormControl>
                            {form.formState.errors.first_name && (
                                <FormDescription className="text-destructive">
                                    <span className="flex gap-2">
                                        <AlertOctagon size={20} />
                                        {form.formState.errors.first_name?.message}
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
                            <FormControl className="dark:bg-foreground border-none">
                                <Input placeholder="Numele tău" {...field} />
                            </FormControl>
                            {form.formState.errors.last_name && (
                                <FormDescription className="text-destructive">
                                    <span className="flex gap-2">
                                        <AlertOctagon size={20} />
                                        {form.formState.errors.last_name?.message}
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
                            <FormControl className="dark:bg-foreground border-none">
                                <Input placeholder="Adresa ta de email" {...field} />
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
                            <FormControl className="dark:bg-foreground border-none">
                                <Input placeholder="Numărul tău de telefon" {...field} />
                            </FormControl>
                            {form.formState.errors.phone_number && (
                                <FormDescription className="text-destructive">
                                    <span className="flex gap-2">
                                        <AlertOctagon size={20} />
                                        {form.formState.errors.phone_number?.message}
                                    </span>
                                </FormDescription>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="agree_to_terms_and_conditions"
                    render={({ field }) => (
                        <FormItem className="mb-4 flex items-start pt-2">
                            <FormControl className="dark:bg-foreground border-none">
                                <Checkbox
                                    required
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="mr-1"
                                />
                            </FormControl>
                            <FormLabel className="mt-0! leading-5">
                                Prin bifarea căsuței alăturate îmi exprim în mod expres
                                consimţământul că sunt de acord cu prelucrarea datelor cu caracter
                                personal conform{' '}
                                <Link
                                    href={
                                        'https://docs.google.com/document/d/1M3xy8RK_zEyt8c3Pkl75QcB-whuD8fE4LjKHkmfCuDY'
                                    }
                                    className="font-bold underline"
                                    target="_blank"
                                >
                                    termenilor și condițiilor
                                </Link>
                            </FormLabel>
                        </FormItem>
                    )}
                />

                <div className="flex w-full justify-end">
                    <Button type="submit">
                        {loading ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                                className="dark:fill-dark mr-2 animate-spin fill-white"
                            >
                                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                            </svg>
                        ) : (
                            <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                        )}
                        Continuă spre plată
                    </Button>
                </div>
            </form>
        </Form>
    );
};
