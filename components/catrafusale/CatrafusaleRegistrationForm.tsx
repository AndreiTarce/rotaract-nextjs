'use client';

import { CHECKOUT_PATH } from '@/lib/constants';
import { ICatrafusaleRegistration } from '@/models/catrafusaleRegistration';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertOctagon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import EmbeddedCheckoutCatrafusale from '../payments/EmbeddedCheckoutCatrafusale';
import { CATRAFUSALE_PACKAGES } from '../payments/constants';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
    first_name: z.string().min(1, {
        message: 'First name is required.',
    }),
    last_name: z.string().min(1, {
        message: 'Last name is required.',
    }),
    shop_name: z.string(),
    email: z.string().min(1, { message: 'Email is required' }).email({
        message: 'Email must be valid. (e.g. example@gmail.com)',
    }),
    phone_number: z.string().min(1, { message: 'Phone number is required' }),
    package: z.string().optional(),
    agree_to_terms_and_conditions: z.boolean().default(false),
});

interface CheckoutFormProps {
    productId: string;
}

export type CatrafusaleFormSchema = z.infer<typeof formSchema>;

export interface ICatrafusaleRegistrationObject
    extends ICatrafusaleRegistration {
    checkout_session_id?: string;
}

export const CatrafusaleRegistrationForm: React.FC<CheckoutFormProps> = ({
    productId,
}) => {
    const [clientSecret, setClientSecret] = useState<string>();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            shop_name: '',
            email: '',
            phone_number: '',
            agree_to_terms_and_conditions: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const packageName = getPackageName(productId);

        const registration: ICatrafusaleRegistrationObject = {
            ...values,
            package: packageName,
            paid: false,
            oneplusone: false,
        };

        const checkoutSession = await getCheckoutSession(
            productId,
            1,
            'payment',
            registration.email,
            { catrafusale_registration: true, productId }
        );

        registration.checkout_session_id = checkoutSession.id;
        sendRegistration(registration);
        setLoading(false);
        setClientSecret(checkoutSession.client_secret);
    };

    const sendRegistration = async (
        registration: ICatrafusaleRegistrationObject
    ) => {
        const abortLongFetch = new AbortController();
        const abortTimeoutId = setTimeout(() => abortLongFetch.abort(), 7000);
        try {
            const response = await fetch('/api/catrafusale', {
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
                metadata: metadata,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });

    const getPackageName = (productId: string) => {
        switch (productId) {
            case CATRAFUSALE_PACKAGES.SINGLE:
                return 'single';
            case CATRAFUSALE_PACKAGES.DOUBLE:
                return 'double';
            case CATRAFUSALE_PACKAGES.SINGLE_TABLE:
                return 'table';
            case CATRAFUSALE_PACKAGES.MIXT:
                return 'mixt';
            default:
                return '';
        }
    };

    if (clientSecret)
        return (
            <div className="md:w-3/4">
                <EmbeddedCheckoutCatrafusale clientSecret={clientSecret} />
            </div>
        );

    return (
        <div className="flex md:w-1/2">
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Mai avem nevoie doar de câteva date</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Prenume</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Prenumele tău"
                                                {...field}
                                            />
                                        </FormControl>
                                        {form.formState.errors.first_name && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .first_name?.message
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
                                            <Input
                                                placeholder="Numele tău"
                                                {...field}
                                            />
                                        </FormControl>
                                        {form.formState.errors.last_name && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .last_name?.message
                                                    }
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shop_name"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>
                                            Numele magazinului tău
                                        </FormLabel>
                                        <FormDescription>
                                            Acesta va apărea pe printurile din
                                            ziua evenimentul. Dacă lași acest
                                            câmp gol, vom folosi numele și
                                            prenumele tău.
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                placeholder="Alege un nume sugestiv și atrăgător"
                                                {...field}
                                            />
                                        </FormControl>
                                        {form.formState.errors.shop_name && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .shop_name?.message
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
                                                    {
                                                        form.formState.errors
                                                            .email?.message
                                                    }
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
                                                placeholder="Numărul tău de telefon"
                                                {...field}
                                            />
                                        </FormControl>
                                        {form.formState.errors.phone_number && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .phone_number
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
                                name="agree_to_terms_and_conditions"
                                render={({ field }) => (
                                    <FormItem className="mb-4 flex items-start pt-2">
                                        <FormControl>
                                            <Checkbox
                                                required
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="mr-1"
                                            />
                                        </FormControl>
                                        <FormLabel className="!mt-0 leading-5">
                                            Prin bifarea căsuței alăturate îmi
                                            exprim în mod expres consimţământul
                                            că sunt de acord cu prelucrarea
                                            datelor cu caracter personal conform{' '}
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
                                <Button
                                    type="submit"
                                    onClick={() => console.log('clicked')}
                                >
                                    {loading ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 512 512"
                                            className="mr-2 animate-spin fill-white dark:fill-dark"
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
                </CardContent>
            </Card>
        </div>
    );
};
