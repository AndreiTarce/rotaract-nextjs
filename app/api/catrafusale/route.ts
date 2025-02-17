import { CatrafusaleRegistrationInteractor } from '@/interactors/catrafusaleRegistrationInteractor';
import connectMongoDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

const registrationInteractor = new CatrafusaleRegistrationInteractor();

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const registration = await request.json();

        const newRegistration = await registrationInteractor.createRegistration(registration);
        return NextResponse.json(newRegistration, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
