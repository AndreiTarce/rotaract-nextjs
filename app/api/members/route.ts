import connectMongoDB from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server";
import Member from "@/models/member";

export async function POST(request: NextRequest) {
    const member = await request.json();
    await connectMongoDB();
    await Member.create(member);
    return NextResponse.json({ message: "Member created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const members = await Member.find();
    return NextResponse.json({ members });
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    await connectMongoDB();
    await Member.findByIdAndDelete(id);
    return NextResponse.json({ message: "Member deleted" }, { status: 200 });
}