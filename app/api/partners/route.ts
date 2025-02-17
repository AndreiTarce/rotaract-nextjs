import { PartnerInteractor } from '@/interactors/partnerInteractor';
import connectMongoDB from '@/lib/mongodb';
import { PartnerRepository } from '@/repositories/partnerRepository';
import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '../utils/error-handler';

const partnerInteractor = new PartnerInteractor(new PartnerRepository());

export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();

        const nameSearchQuery = request.nextUrl.searchParams.get('name');
        if (nameSearchQuery) {
            const partners = await partnerInteractor.getPartnersByName(nameSearchQuery);
            return NextResponse.json(partners, { status: 200 });
        }

        const partners = await partnerInteractor.getPartners();

        return NextResponse.json(partners, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();

        const data = await request.json();

        const partner = await partnerInteractor.createPartner(data);

        return NextResponse.json(partner, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}
