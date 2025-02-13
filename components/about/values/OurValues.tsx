import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    faBrain,
    faCircleNodes,
    faHandFist,
    faHandHoldingMedical,
    faHandshakeAngle,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import Value from './Value'
import ValuesCarousel from './ValuesCarousel'

export default function OurValues() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-4">
                <CardTitle className="text-7xl font-extrabold max-md:text-5xl leading-none bg-linear-to-r from-rotaract-cranberry to-rose-500 bg-clip-text text-transparent">
                    Valorile noastre
                </CardTitle>
            </CardHeader>
            <CardContent className="grow flex flex-col justify-between">
                <p className="text-justify text-muted-foreground mb-4 max-md:text-justify">
                    Acestea ne ghidează și ne definesc, punând temelia pentru
                    fiecare pas pe care îl facem în slujba comunității. Ne
                    propunem să rămânem fideli valorilor noastre, astfel
                    asigurându-ne că fiecare acțiune pe care o întreprindem are
                    o bază solidă și un scop autentic.
                </p>
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
        </Card>
    )
}
