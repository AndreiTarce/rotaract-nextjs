import { TicketNumbers } from '@/models/catrafusaleRaffleRegistration';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export const CatrafusaleRaffleTicketEmail = (ticket_numbers: TicketNumbers) => (
    <Html>
        <Head />
        <Preview>Numerele biletelor tale la tombolă</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={logoContainer}>
                    <Img
                        src={`${baseUrl}/static/catrafusale_black.png`}
                        width="auto"
                        height="100"
                        alt="Catrafusale"
                    />
                </Section>
                <Heading style={h1}>
                    Mulțumim pentru achiziționarea unui bilet în cadrul tombolei
                    noastre!
                </Heading>
                <Text style={heroText}>
                    Îți amintim cu această ocazie că toate fondurile acumulate
                    în urma tombolei sunt direcționate către cauza noastră,
                    îmbunătățirea condițiilor generale din cadrul școlii “Iuliu
                    Hațieganu” din Panticeu. Așadar îți mulțumim pentru aportul
                    tău în încurajarea parcursului școlar al acestor copii.
                </Text>
                <Text style={text}>
                    Extragerea câștigătorilor are loc în data de 2 Iunie, în
                    cadrul evenimentului nostru CatrafuSALE, unde te așteptăm cu
                    multe activități și surprize! Premiile care pot fi câștigate
                    sunt următoarele:
                    <ol>
                        <li>Un abonament la Untold.</li>
                        <li>
                            10 pachete de vouchere cu reducere
                            individuala/pachet de minim 300€ pentru vacanțe pe
                            velier de la Dream Sales.
                        </li>
                        <li>
                            Voucher de cazare pentru 2 persoane 1 noapte de
                            weekend în regim Bed & Breakfast la Double Tree by
                            Hilton Cluj-Napoca.
                        </li>
                        <li>
                            Voucher Day Pass la Salute per Aqua pentru 2
                            persons, în incinta Double Tree by Hilton
                            Cluj-Napoca.
                        </li>
                        <li>
                            Un voucher de 300 de lei pentru o masă la Livada.
                        </li>
                        <li>Un voucher pentru tuns și aranjat la Vestige.</li>
                        <li>
                            1 voucher de 50% reducere pentru 2 ore de joc, 8
                            persoane, la LaserTag Fonix Cluj.
                        </li>
                        <li>
                            2 vouchere de 50% reducere pentru 1 ore de joc, 8
                            persoane, la LaserTag Fonix Cluj.
                        </li>
                        <li>
                            3 abonamente duble la Transylvania International
                            Spoken Word Festival.
                        </li>
                        <li>
                            3 vouchere pentru 1 luna de cafea gratuită la Ted’s
                            Coffee.
                        </li>
                        <li>
                            O periuța de dinți electrică Astfel, vom avea la
                            finalul tombolei nu mai puțin de 25 de câștigători.
                        </li>
                    </ol>
                </Text>

                <Section>
                    <Text style={text}>
                        Mai jos găsești numărul biletelor tale:
                    </Text>
                    <Section style={codeBox}>
                        <Text style={confirmationCodeText}>
                            {ticket_numbers.start === ticket_numbers.end
                                ? `${ticket_numbers.start}`
                                : `${ticket_numbers.start}-${ticket_numbers.end}`}
                        </Text>
                    </Section>
                </Section>

                <Text style={text}>
                    Dacă te afli printre câștigători, te vom contacta în ziua
                    următoare pentru a-ți revendica premiul. Pentru alte
                    întrebări, ne poți contacta pe paginile noastre de social
                    media sau la adresa de e-mail rotaractvisiocluj@gmail.com.
                </Text>
                <Text style={text}>Mult noroc! Echipa CatrafuSALE</Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
    margin: '0 auto',
    padding: '0px 20px',
};

const logoContainer = {
    marginTop: '32px',
};

const h1 = {
    color: '#1d1c1d',
    fontSize: '36px',
    fontWeight: '700',
    margin: '30px 0',
    padding: '0',
    lineHeight: '42px',
};

const heroText = {
    fontSize: '20px',
    lineHeight: '28px',
    marginBottom: '30px',
};

const codeBox = {
    background: 'rgb(245, 244, 245)',
    borderRadius: '4px',
    marginBottom: '30px',
    padding: '40px 10px',
};

const confirmationCodeText = {
    fontSize: '30px',
    textAlign: 'center' as const,
    verticalAlign: 'middle',
};

const text = {
    color: '#000',
    fontSize: '14px',
    lineHeight: '24px',
};
