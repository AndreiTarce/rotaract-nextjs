import clujImage from '@/assets/images/cluj4.webp';
import clujBiserica from '@/assets/images/cluj_biserica2.webp';
import { ROTARY_VISIO_WEBSITE_URL } from '@/lib/constants';
import {
    faArrowUpRightFromSquare,
    faBrain,
    faCircleNodes,
    faHandFist,
    faHandHoldingMedical,
    faHandshakeAngle,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Value from './values/Value';
import ValuesCarousel from './values/ValuesCarousel';

export default function AboutVisio() {
    return (
        <Card className="relative z-0 mt-8 overflow-hidden rounded-lg border shadow-md">
            <div className="md:grid md:grid-cols-[50%_50%]">
                <Image
                    src={clujImage}
                    alt="Cluj-Napoca Church"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'right',
                        height: '100%',
                        width: 'auto',
                    }}
                    loading="lazy"
                    className="max-md:hidden"
                />

                <div className="h-fit">
                    <CardHeader>
                        <CardTitle className="from-rotaract-cranberry bg-linear-to-r to-rose-500 bg-clip-text text-end text-7xl leading-none font-extrabold text-transparent max-md:text-5xl">
                            Despre Visio
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                        <div className="dark:text-muted-foreground md:text-muted-foreground relative z-10 mb-8 text-end">
                            <p className="mb-4 max-md:text-justify">
                                Clubul nostru a fost chartat în data de 12 octombrie 2013, sub
                                îndrumarea clubului{' '}
                                <Link
                                    href={ROTARY_VISIO_WEBSITE_URL}
                                    target="_blank"
                                    className="underline underline-offset-4"
                                >
                                    Rotary Visio Cluj-Napoca{' '}
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
                                </Link>
                                . Cu o istorie de implicare comunitară de peste un deceniu, ne
                                străduim să aducem schimbări pozitive în orașul nostru și în lumea
                                din jurul nostru.
                            </p>
                            <p className="max-md:text-justify">
                                Misiunea noastră este de a inspira și mobiliza tinerii din
                                Cluj-Napoca pentru a se implica activ în proiecte de voluntariat,
                                dezvoltând astfel lideri viitori și promovând serviciul în
                                comunitate.
                            </p>
                        </div>
                        <Image
                            src={clujBiserica}
                            alt="Cluj-Napoca Church"
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                            className="md:hidden"
                            loading="lazy"
                        />
                        <ValuesCarousel>
                            <Value
                                icon={faUserGroup}
                                title="Prietenie"
                                text="Poate este nedrept să ne numim un simplu club. Suntem o comunitate unită de prieteni și considerăm că fără legături autentice nu putem funcționa la potențialul maxim."
                            />
                            <Value
                                icon={faHandshakeAngle}
                                title="Implicare"
                                text="Suntem dornici de a ne implica activ în comunitatea noastră. Acțiunile noastre demonstrează angajamentul nostru față de nevoile celor din jur și dorința de a face o schimbare pozitivă."
                            />
                            <Value
                                icon={faBrain}
                                title="Dezvoltare"
                                text="Suntem mereu în căutare de oportunități de creștere personală și profesională. Credem cu tărie că investind atât în dezvoltarea noastră, cât și a tinerilor din România punem bazele unui viitor mai bun."
                            />
                            <Value
                                icon={faHandHoldingMedical}
                                title="Serviciu"
                                text="Serviciul în comunitate este inima a ceea ce facem. Ne angajăm să fim servitori activi ai societății, căutând mereu modalități de a ajuta și de a sprijini pe cei în nevoie."
                            />
                            <Value
                                icon={faHandFist}
                                title="Leadership"
                                text="Suntem lideri în formare, pregătiți să inspirăm și să ghidăm. Căutăm mereu oportunități de a dezvolta lideri viitori și de a influența schimbarea în comunitatea noastră."
                            />
                            <Value
                                icon={faCircleNodes}
                                title="Comunitate"
                                text="Suntem mândri să facem parte dintr-o rețea solidă de cluburi Rotaract din întregul nostru District. Împreună, suntem o forță colectivă, capabilă să aducă schimbări semnificative și durabile în lumea din jurul nostru."
                            />
                        </ValuesCarousel>
                    </CardContent>
                </div>
            </div>
        </Card>
    );
}
