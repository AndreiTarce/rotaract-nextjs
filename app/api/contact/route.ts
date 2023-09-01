import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormSchema } from '@/components/ui/contact/ContactForm';
import rateLimit from '../utils/rate-limiter';


const resend = new Resend(process.env.RESEND_API_KEY);

const limiter = rateLimit({ interval: 60 * 1000 * 60 * 24, uniqueTokenPerInterval: 100 })

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await limiter.check(response, 10, 'CACHE_TOKEN');
        const body: ContactFormSchema = await request.json();
        const data = await resend.emails.send({
            from: 'contact@rotaractvisio.com',
            to: ['tarceandrei@gmail.com'],
            subject: body.subject,
            html: body.message
        });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
    }
}