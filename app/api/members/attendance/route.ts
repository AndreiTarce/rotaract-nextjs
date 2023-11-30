import { getAttendance } from '@/lib/entityService'
import connectMongoDB from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    await connectMongoDB()
    const memberId = new ObjectId(request.nextUrl.searchParams.get('id')!)
    const attendance = await getAttendance(memberId)
    return NextResponse.json(attendance)
}
