'use client';
import { CHECKOUT_PATH } from '@/lib/constants';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';

export default function DonateButton(props: {
    setClientSecret: Dispatch<SetStateAction<string | undefined>>;
    price: string;
    quantity: number;
    mode: string;
    children: ReactNode;
    interval?: string;
    currency?: string;
}) {
    const [loading, setLoading] = useState(false);
    const getCheckoutSession = async (
        price: string,
        quantity: number,
        mode: string,
        interval?: string,
        currency?: string
    ) => {
        props.setClientSecret(undefined);
        setLoading(true);
        fetch(CHECKOUT_PATH, {
            method: 'POST',
            body: JSON.stringify({
                price: price,
                quantity: quantity,
                mode: mode,
                interval: interval,
                currency: currency,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                props.setClientSecret(data.client_secret);
                setLoading(false);
            });
    };

    return (
        <Button
            onClick={() =>
                getCheckoutSession(
                    props.price,
                    props.quantity,
                    props.mode,
                    props.interval,
                    props.currency
                )
            }
            className="font-semibold"
        >
            {loading && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    className="animate-spin mr-2 fill-white dark:fill-background"
                >
                    <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                </svg>
            )}
            {props.children}
        </Button>
    );
}
