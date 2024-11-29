import { CatrafusaleWorkshopRegistrationInteractor } from '@/interactors/catrafusaleRegistrationInteractor';
import connectMongoDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

const registrationInteractor = new CatrafusaleWorkshopRegistrationInteractor();

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await connectMongoDB();
        const registration = await request.json();

        const newRegistration =
            await registrationInteractor.createRegistration(registration);
        return NextResponse.json(newRegistration, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
