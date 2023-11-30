import connectMongoDB from '@/lib/mongodb'
import Meeting from '@/models/meeting'
import Member, { IMember } from '@/models/member'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const api_key = request.nextUrl.searchParams.get('api_key')
    if (api_key === process.env.NEXT_PUBLIC_API_KEY) {
        try {
            const meeting = await request.json()
            await connectMongoDB()
            const { presentMembers } = meeting
            if (presentMembers && presentMembers.length) {
                const completeMembers = await Member.find().lean()

                const absentMembers = completeMembers.filter(
                    (member) =>
                        !presentMembers.some(
                            (presentMember: IMember) =>
                                presentMember.id === member.id
                        )
                )

                await Meeting.create({ ...meeting, absentMembers })
                return NextResponse.json(
                    { message: 'Meeting created' },
                    { status: 201 }
                )
            }
            await Meeting.create(meeting)
            return NextResponse.json(
                { message: 'Meeting created' },
                { status: 201 }
            )
        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: error }, { status: 500 })
        }
    }
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
}

export async function GET(request: NextRequest) {
    const api_key = request.nextUrl.searchParams.get('api_key')
    const type = request.nextUrl.searchParams.get('type')
    if (api_key === process.env.NEXT_PUBLIC_API_KEY) {
        const startDateString =
            request.nextUrl.searchParams.get('startDate') || '2014-01-01'
        const endDateString =
            request.nextUrl.searchParams.get('endDate') || '2100-01-01'
        const startDate = new Date(startDateString)
        const endDate = new Date(endDateString)
        await connectMongoDB()
        if (type) {
            const meetings = await Meeting.find({
                start_date: { $gte: startDate, $lte: endDate },
                type: type,
            }).sort({ start_date: -1 })
            return NextResponse.json({ meetings })
        }
        const meetings = await Meeting.find({
            start_date: { $gte: startDate, $lte: endDate },
        }).sort({ start_date: -1 })
        return NextResponse.json({ meetings })
    }
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
}

export async function DELETE(request: NextRequest) {
    const api_key = request.nextUrl.searchParams.get('api_key')
    if (api_key === process.env.NEXT_PULIC_API_KEY) {
        const { id } = await request.json()
        await connectMongoDB()
        await Meeting.findByIdAndDelete(id)
        return NextResponse.json(
            { message: 'Meeting deleted' },
            { status: 200 }
        )
    }
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
}
