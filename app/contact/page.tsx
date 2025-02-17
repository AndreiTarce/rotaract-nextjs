import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/ui/contact/ContactForm';
import ContactInfoCard from '@/components/ui/contact/ContactInfoCard';
import {
    FACULTY_OF_BUSINESS_WEBSITE_URL,
    ROTARACT_VISIO_EMAIL,
    ROTARACT_VISIO_FACEBOOK_URL,
    ROTARACT_VISIO_INSTAGRAM_URL,
    ROTARACT_VISIO_LINKEDIN_URL,
    ROTARACT_VISIO_TIKTOK_URL,
} from '@/lib/constants';
import { faFacebook, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import {
    faArrowUpRightFromSquare,
    faCalendar,
    faChalkboardUser,
    faClock,
    faEnvelope,
    faHashtag,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Contact | Rotaract Visio Cluj-Napoca',
    description:
        'Vrei să te implici în comunitatea locală, sau pur și simplu vrei să afli mai multe despre noi? Suntem nerăbdători să auzim noi inițiative, așa că nu ezita să ne contactezi!',
};

export default function Contact() {
    return (
        <main className="mx-24 mt-5 mb-8 grid min-h-screen max-md:mx-4 md:mt-12 md:grid-cols-2">
            <div className="mb-4">
                <h1 className="from-rotaract-cranberry mb-4 w-fit bg-linear-to-r to-rose-500 bg-clip-text text-7xl leading-none font-extrabold text-transparent max-md:text-5xl">
                    Contactează-ne
                </h1>
                <p className="text-muted-foreground">
                    Vrei să te implici în comunitatea locală, sau pur și simplu vrei să afli mai
                    multe despre noi? Suntem nerăbdători să auzim noi inițiative, așa că nu ezita să
                    ne contactezi!
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        <ContactInfoCard title="Email" icon={faEnvelope}>
                            <Link href={`mailto:${ROTARACT_VISIO_EMAIL}`}>
                                <p className="text-muted-foreground break-all">
                                    {ROTARACT_VISIO_EMAIL}
                                </p>
                            </Link>
                        </ContactInfoCard>
                        <ContactInfoCard title="Social Media" icon={faHashtag}>
                            <div className="text-muted-foreground flex gap-4">
                                <Link href={ROTARACT_VISIO_INSTAGRAM_URL} target="_blank">
                                    <FontAwesomeIcon icon={faInstagram} size="xl" />
                                </Link>
                                <Link href={ROTARACT_VISIO_FACEBOOK_URL} target="_blank">
                                    <FontAwesomeIcon icon={faFacebook} size="xl" />
                                </Link>
                                <Link href={ROTARACT_VISIO_LINKEDIN_URL} target="_blank">
                                    <FontAwesomeIcon icon={faLinkedin} size="xl" />
                                </Link>
                                <Link href={ROTARACT_VISIO_TIKTOK_URL} target="_blank">
                                    <FontAwesomeIcon icon={faTiktok} size="xl" />
                                </Link>
                            </div>
                        </ContactInfoCard>
                    </div>
                    <ContactInfoCard title="Ședințe" icon={faChalkboardUser}>
                        <div className="text-muted-foreground mb-2 flex">
                            <FontAwesomeIcon icon={faLocationDot} className="mt-1 mr-4" />
                            <Link href={FACULTY_OF_BUSINESS_WEBSITE_URL} target="_blank">
                                <p>
                                    Facultatea de Business, Universitatea Babeș-Bolyai Cluj-Napoca{' '}
                                    <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                        size="xs"
                                        className="opacity-50"
                                    />
                                </p>
                            </Link>
                        </div>
                        <div className="text-muted-foreground mb-2 flex">
                            <FontAwesomeIcon icon={faCalendar} className="mt-1 mr-4" />
                            <p>În fiecare Joi</p>
                        </div>
                        <div className="text-muted-foreground mb-2 flex">
                            <FontAwesomeIcon icon={faClock} className="mt-1 mr-4" />
                            <p>20:00</p>
                        </div>
                    </ContactInfoCard>
                </div>
            </div>
            <div className="flex h-fit justify-center md:justify-end">
                <Card className="w-full max-w-xl rounded-lg border shadow-md">
                    <CardHeader>
                        <CardTitle>Intră în legătură cu noi!</CardTitle>
                        <CardDescription>
                            Completează formularul de mai jos iar echipa noastră va reveni cu un
                            răspuns în cel mai scurt timp posibil.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContactForm />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
