import { ContactFormSchema } from '@/components/ui/contact/ContactForm';
import { sendContactEmail } from '@/use-cases/contact/sendContactEmail';
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '../utils/rate-limiter';

const limiter = rateLimit({
    interval: 60 * 1000 * 60 * 24,
    uniqueTokenPerInterval: 100,
});

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await limiter.check(/* @next-codemod-error 'response' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */
        response, 10, 'CACHE_TOKEN');
        const body: ContactFormSchema = await request.json();
        const bodyString = `NUME: ${body.first_name} ${body.last_name}\nEMAIL: ${body.email}\nMESSAGE:${body.message}`;
        await sendContactEmail(body.subject, bodyString);
        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Too many requests.' },
            { status: 429 }
        );
    }
}
