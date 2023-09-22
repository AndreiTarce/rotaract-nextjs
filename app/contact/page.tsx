import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import ContactForm from '@/components/ui/contact/ContactForm'
import ContactInfoCard from '@/components/ui/contact/ContactInfoCard'
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons'
import {
    faCalendar,
    faChalkboardUser,
    faClock,
    faEnvelope,
    faHashtag,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const PageWrapper = dynamic(
    () => import('@/components/ui/animation/PageWrapper')
)

export default function Contact() {
    return (
        <PageWrapper>
            <main className="mt-12 mx-24 max-md:mx-4 mb-8 grid md:grid-cols-2 min-h-screen">
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
                    <div className="grid md:grid-cols-2 gap-4 mt-8">
                        <div className="flex flex-col gap-4">
                            <ContactInfoCard title="Email" icon={faEnvelope}>
                                <Link href="mailto:rotaractvisioclujsite@gmail.com">
                                    <p className="break-all text-muted-foreground">
                                        rotaractvisioclujsite@gmail.com
                                    </p>
                                </Link>
                            </ContactInfoCard>
                            <ContactInfoCard title="Socials" icon={faHashtag}>
                                <div className="flex gap-4 text-muted-foreground">
                                    <Link
                                        href="https://www.instagram.com/rotaractvisiocj/"
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon
                                            icon={faInstagram}
                                            size="xl"
                                        />
                                    </Link>
                                    <Link
                                        href="https://www.facebook.com/RotaractVisioClujNapoca"
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFacebook}
                                            size="xl"
                                        />
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/company/rotaract-cluj-napoca-visio"
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon
                                            icon={faLinkedin}
                                            size="xl"
                                        />
                                    </Link>
                                    <Link
                                        href="https://www.tiktok.com/@rotaractvisiocluj"
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTiktok}
                                            size="xl"
                                        />
                                    </Link>
                                </div>
                            </ContactInfoCard>
                        </div>
                        <ContactInfoCard
                            title="Sedinte"
                            icon={faChalkboardUser}
                        >
                            <div className="flex text-muted-foreground mb-2">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="mr-4 mt-1"
                                />
                                <p>
                                    Facultatea de Business, Universitatea Babes
                                    Bolyai Cluj-Napoca
                                </p>
                            </div>
                            <div className="flex text-muted-foreground mb-2">
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="mr-4 mt-1"
                                />
                                <p>In fiecare Joi</p>
                            </div>
                            <div className="flex text-muted-foreground mb-2">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="mr-4 mt-1"
                                />
                                <p>19:00</p>
                            </div>
                        </ContactInfoCard>
                    </div>
                </div>
                <div className="flex justify-center md:justify-end h-fit">
                    <Card className="w-full max-w-xl">
                        <CardHeader>
                            <CardTitle>Get in touch with us!</CardTitle>
                            <CardDescription>
                                Fill out your info and our team will get back to
                                you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ContactForm />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageWrapper>
    )
}
