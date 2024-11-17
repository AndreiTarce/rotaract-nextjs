import { CatrafusaleRegistrationInteractor } from '@/interactors/catrafusaleRegistrationInteractor';
import connectMongoDB from '@/lib/mongodb';
import { createRegistration } from '@/use-cases/registrations/CatrafusaleRegistration2024Winter';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../utils/error-handler';

const registrationInteractor = new CatrafusaleRegistrationInteractor();

export async function GET() {
    try {
        await connectMongoDB();

        const registrations = await registrationInteractor.getRegistrations();

        return NextResponse.json(registrations, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const data = await request.json();

        const registration = await createRegistration(data);

        return NextResponse.json(registration, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
