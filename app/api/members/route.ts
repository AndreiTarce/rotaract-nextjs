import connectMongoDB from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import Member from '@/models/member'

export async function POST(request: NextRequest) {
    const member = await request.json()
    await connectMongoDB()
    await Member.create(member)
    return NextResponse.json({ message: 'Member created' }, { status: 201 })
}

export async function GET(request: NextRequest) {
    await connectMongoDB()
    const nameSearchQuery = request.nextUrl.searchParams.get('name')
    if (nameSearchQuery) {
        const members = await Member.find({
            $or: [
                {
                    first_name: {
                        $regex: nameSearchQuery,
                        $options: 'i',
                    },
                },
                {
                    last_name: {
                        $regex: nameSearchQuery,
                        $options: 'i',
                    },
                },
            ],
        })
        return NextResponse.json({ members })
    }
    const members = await Member.find()
    return NextResponse.json({ members })
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json()
    await connectMongoDB()
    await Member.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Member deleted' }, { status: 200 })
}
