import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormSchema } from '@/components/ui/contact/ContactForm';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormSchema = await request.json();
        const data = await resend.emails.send({
            from: 'contact@rotaractvisio.com',
            to: ['tarceandrei@gmail.com'],
            subject: body.subject,
            html: body.message
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}