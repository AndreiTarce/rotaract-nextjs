import { ContactFormSchema } from '@/components/ui/contact/ContactForm';
import { ROTARACT_VISIO_CONTACT_EMAIL } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import rateLimit from '../utils/rate-limiter';

const limiter = rateLimit({
    interval: 60 * 1000 * 60 * 24,
    uniqueTokenPerInterval: 100,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await limiter.check(response, 10, 'CACHE_TOKEN');
        const body: ContactFormSchema = await request.json();
        const bodyString = `NUME: ${body.first_name} ${body.last_name}\nEMAIL: ${body.email}\nMESSAGE:${body.message}`;
        const data = await resend.emails.send({
            from: ROTARACT_VISIO_CONTACT_EMAIL,
            to: [
                'tarceandrei@gmail.com',
                'rotaractvisiocluj@gmail.com',
                'gabrielamusteata28@gmail.com',
                'alexmuresan.dacian@gmail.com',
            ],
            subject: body.subject,
            html: bodyString,
        });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Too many requests.' },
            { status: 429 }
        );
    }
}
