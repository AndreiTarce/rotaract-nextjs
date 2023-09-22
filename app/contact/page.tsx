import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import ContactForm from '@/components/ui/contact/ContactForm'
import { Separator } from '@/components/ui/separator'

export default function Contact() {
    return (
        <main className="mt-12 mx-16 max-md:mx-4 mb-8 grid md:grid-cols-2">
            <div className="mb-8">
                <h1 className="w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent mb-2">
                    Contacteaza-ne
                </h1>
                <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus odit aut illo neque corporis sapiente cum eum
                    laboriosam iure unde temporibus, doloremque eos quae?
                    Expedita soluta ratione adipisci magni velit.
                </p>
            </div>
            <div className="flex justify-center">
                <Card className="w-full max-w-xl">
                    <CardHeader>
                        <CardTitle>Get in touch with us!</CardTitle>
                        <CardDescription>
                            Fill out your info and our team will get back to you
                            as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContactForm />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
