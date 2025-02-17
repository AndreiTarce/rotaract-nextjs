import { ROTARACT_VISIO_EMAIL } from '@/lib/constants';
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
import Stripe from 'stripe';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

export const CatrafusaleFlashSaleEmail = (promotionCode: Stripe.PromotionCode) => (
    <Html>
        <Head />
        <Preview>Îți mulțumim pentru donație!</Preview>
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
                <Heading style={h1}>Îți mulțumim pentru donație!</Heading>
                <Text style={heroText}>
                    Te așteptăm cu mare drag, în data de 2 iunie la CATRAFU-SALE #8! De asemenea, ai
                    mai jos un cod de reducere 100% (aplicabil pachetelor cu valoare mai mică sau
                    egală cu cel achiziționat), pe care îl poți trimite unui prieten!
                </Text>

                <Section style={codeBox}>
                    <Text style={confirmationCodeText}>{promotionCode.code}</Text>
                </Section>

                <Text style={text}>
                    Pentru ca prietenul tău să poată beneficia de această ofertă, va trebui să
                    acceseze pagina de înscrieri, să aleagă un pachet și să completeze formularul.
                    Ultimul pas va fi pagina de plată, unde va putea introduce codul promoțional.
                    Dacă întâmpinați probleme sau aveți întrebări, vă rugăm să ne contactați la
                    adresa de email {ROTARACT_VISIO_EMAIL}
                    sau pe conturile noastre de social media.
                </Text>
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
