'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlertOctagon, MailCheck } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '../textarea';
import { Toaster } from '../toaster';
import { useToast } from '../use-toast';

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
    subject: z.string().min(1, {
        message: 'Subject is required.',
    }),
    message: z.string().min(1, {
        message: 'Message is required.',
    }),
});

export type ContactFormSchema = z.infer<typeof formSchema>;

export default function ContactForm() {
    const contactStatuses = {
        loading: 'loading',
        submitted: 'submitted',
        error: 'error',
    };

    const [status, setStatus] = useState('');

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const abortLongFetch = new AbortController();
        const abortTimeoutId = setTimeout(() => abortLongFetch.abort(), 7000);

        setStatus(contactStatuses.loading);

        fetch('/api/contact', {
            signal: abortLongFetch.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => {
                if (res.ok) {
                    clearTimeout(abortTimeoutId);
                    setStatus(contactStatuses.submitted);
                    form.reset();
                    toast({
                        title: 'Message sent',
                        description: (
                            <div className="flex gap-2">
                                <MailCheck />
                                <span className="self-center">
                                    Your message was succesfully sent! Our team
                                    will get back to you as soon as possible.
                                </span>
                            </div>
                        ),
                        duration: 10000,
                    });
                }
                throw new Error('Whoops! Error sending email.');
            })
            .catch((err) => {
                setStatus(contactStatuses.error);
            });
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
                    name="subject"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Subiect</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Subiectul mesajului"
                                    {...field}
                                />
                            </FormControl>
                            {form.formState.errors.subject && (
                                <FormDescription className="text-destructive">
                                    <span className="flex gap-2">
                                        <AlertOctagon size={20} />
                                        {form.formState.errors.subject?.message}
                                    </span>
                                </FormDescription>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>Mesaj</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Scrie mesajul tău aici"
                                    {...field}
                                />
                            </FormControl>
                            {form.formState.errors.message && (
                                <FormDescription className="text-destructive">
                                    <span className="flex gap-2">
                                        <AlertOctagon size={20} />
                                        {form.formState.errors.message?.message}
                                    </span>
                                </FormDescription>
                            )}
                        </FormItem>
                    )}
                />
                <div className="flex w-full justify-end">
                    <Button type="submit">
                        {status === contactStatuses.loading ? (
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
                                icon={faPaperPlane}
                                className="mr-2"
                            />
                        )}
                        Trimite
                    </Button>
                </div>
            </form>
            <Toaster />
        </Form>
    );
}
