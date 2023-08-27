import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectMongoDB();
    const { id } = params;
    const project = await Project.findOne({ url: id }).lean();
    return NextResponse.json(project);
}