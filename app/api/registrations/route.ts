//temporary test route
import { CatrafusaleRegistrationInteractor } from '@/interactors/catrafusaleRegistrationInteractor';
import connectMongoDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
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
