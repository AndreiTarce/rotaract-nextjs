import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Member from "@/models/member";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectMongoDB();
    const { id } = params;
    const member = await Member.findOne({ url: id }).lean();
    return NextResponse.json(member);
}