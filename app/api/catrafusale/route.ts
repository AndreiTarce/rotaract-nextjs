import { ICatrafusaleRegistrationObject } from '@/components/catrafusale/CatrafusaleRegistrationForm'
import connectMongoDB from '@/lib/mongodb'
import CatrafusaleRegistration from '@/models/catrafusaleRegistration'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const registration: ICatrafusaleRegistrationObject =
            await request.json()
        console.log(registration)
        await connectMongoDB()
        await CatrafusaleRegistration.create(registration)
        return NextResponse.json(registration, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}
