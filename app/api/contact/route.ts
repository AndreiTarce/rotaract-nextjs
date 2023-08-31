import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['tarceandrei@gmail.com'],
            subject: "Hello world",
            html: 'Test'
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}