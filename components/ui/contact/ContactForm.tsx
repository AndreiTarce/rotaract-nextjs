'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertOctagon } from 'lucide-react'
import { useState } from 'react'

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
})

export type ContactFormSchema = z.infer<typeof formSchema>

export default function ContactForm() {
    const contactStatuses = {
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
            subject: '',
            message: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Used to Abort a long running fetch.
        const abortLongFetch = new AbortController()
        // Abort after 7 seconds.
        const abortTimeoutId = setTimeout(() => abortLongFetch.abort(), 7000)

        // Don't want to actually submit the form
        // e.preventDefault()
        console.log(values)

        // Loading
        setStatus(contactStatuses.loading)

        // You can change this fetch URL to a bad url to see the .catch() block hit
        // Example: '/api/contact-bad'
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
                    // If we got an 'ok' response from fetch, clear the AbortController timeout
                    clearTimeout(abortTimeoutId)
                    return res.json()
                }
                // If the response was anything besides 'ok', throw an error to hit our .catch() block
                throw new Error('Whoops! Error sending email.')
            })
            .then((res) => {
                // On a successful search, set the status to 'submitted' and reset the fields
                setStatus(contactStatuses.submitted)
                form.reset()
            })
            .catch((err) => {
                // There was an error, catch it and set the status to 'error'
                setStatus(contactStatuses.error)
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
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your first name"
                                    {...field}
                                />
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
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your last name"
                                    {...field}
                                />
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
                                    placeholder="Your email address"
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
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Message subject"
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
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Type your message here"
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
                <Button type="submit">
                    {status === contactStatuses.loading && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            className="animate-spin mr-2 fill-white dark:fill-dark"
                        >
                            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                        </svg>
                    )}
                    Submit
                </Button>
            </form>
        </Form>
    )
}
