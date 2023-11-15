import connectMongoDB from "@/lib/mongodb"
import Meeting from "@/models/meeting";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const api_key = request.nextUrl.searchParams.get('api_key');
    if (api_key === process.env.NEXT_PUBLIC_API_KEY) {
        const meeting = await request.json();
        await connectMongoDB();
        await Meeting.create(meeting);
        return NextResponse.json({ message: "Meeting created" }, { status: 201 });
    }
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
}

export async function GET(request: NextRequest) {
    const api_key = request.nextUrl.searchParams.get('api_key');
    if (api_key === process.env.NEXT_PUBLIC_API_KEY) {
        const startDateString = request.nextUrl.searchParams.get('startDate') || '2014-01-01';
        const endDateString = request.nextUrl.searchParams.get('endDate') || '2100-01-01';
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        await connectMongoDB();
        const meetings = await Meeting.find({ start_date: { $gte: startDate, $lte: endDate } }).sort({ start_date: -1 });
        return NextResponse.json({ meetings });
    }
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
}

export async function DELETE(request: NextRequest) {
    const api_key = request.nextUrl.searchParams.get('api_key');
    if (api_key === process.env.NEXT_PULIC_API_KEY) {
        const { id } = await request.json();
        await connectMongoDB();
        await Meeting.findByIdAndDelete(id);
        return NextResponse.json({ message: "Meeting deleted" }, { status: 200 });
    }
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
}