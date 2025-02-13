import { CheckoutFormSchema } from '@/app/mindmatters/page_disabled';
import connectMongoDB from '@/lib/mongodb';
import MindMattersRegistration from '@/models/mindMattersRegistration';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const registration: CheckoutFormSchema = await request.json();
        console.log(registration);
        await connectMongoDB();
        await MindMattersRegistration.create(registration);
        return NextResponse.json(registration, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
