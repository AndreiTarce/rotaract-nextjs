import connectMongoDB from "@/lib/mongodb";
import FeaturedProject from "@/models/featuredProject";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const featuredProject = await FeaturedProject.find();
    return NextResponse.json({ featuredProject });
}