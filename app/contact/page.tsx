import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import ContactForm from '@/components/ui/contact/ContactForm'

export default function Contact() {
    return (
        <main className="mt-24 mx-16 max-md:mx-4 mb-8 flex justify-center">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>Get in touch with us!</CardTitle>
                    <CardDescription>
                        Fill out your info and our team will get back to you as
                        soon as possible.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
        </main>
    )
}
