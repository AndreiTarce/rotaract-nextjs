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
    faArrowUpRightFromSquare,
    faCalendar,
    faChalkboardUser,
    faClock,
    faEnvelope,
    faHashtag,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Contact() {
    return (
        <main className="mt-5 md:mt-12 mx-24 max-md:mx-4 mb-8 grid md:grid-cols-2 min-h-screen">
            <div className="mb-4">
                <h1 className="w-fit text-7xl font-extrabold max-md:text-5xl leading-none bg-gradient-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent mb-4">
                    Contactează-ne
                </h1>
                <p className="text-muted-foreground">
                    Vrei să te implici în comunitatea locală, sau pur și simplu
                    vrei să afli mai multe despre noi? Suntem nerăbdători să
                    auzim noi inițiative, așa că nu ezita să ne contactezi!
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
                    <ContactInfoCard title="Sedinte" icon={faChalkboardUser}>
                        <div className="flex text-muted-foreground mb-2">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="mr-4 mt-1"
                            />
                            <Link
                                href="https://tbs.ubbcluj.ro/"
                                target="_blank"
                            >
                                <p>
                                    Facultatea de Business, Universitatea
                                    Babeș-Bolyai Cluj-Napoca{' '}
                                    <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                        size="xs"
                                        className="opacity-50"
                                    />
                                </p>
                            </Link>
                        </div>
                        <div className="flex text-muted-foreground mb-2">
                            <FontAwesomeIcon
                                icon={faCalendar}
                                className="mr-4 mt-1"
                            />
                            <p>În fiecare Joi</p>
                        </div>
                        <div className="flex text-muted-foreground mb-2">
                            <FontAwesomeIcon
                                icon={faClock}
                                className="mr-4 mt-1"
                            />
                            <p>20:00</p>
                        </div>
                    </ContactInfoCard>
                </div>
            </div>
            <div className="flex justify-center md:justify-end h-fit">
                <Card className="w-full max-w-xl shadow-md border rounded-lg">
                    <CardHeader>
                        <CardTitle>Intră în legătură cu noi!</CardTitle>
                        <CardDescription>
                            Completează formularul de mai jos iar echipa noastră
                            va reveni cu un răspuns în cel mai scurt timp
                            posibil.
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
