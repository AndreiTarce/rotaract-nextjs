import connectMongoDB from "@/lib/mongodb";
import Cause from "@/models/causes";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const causes = await Cause.find();
    return NextResponse.json({ causes });
}