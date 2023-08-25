import connectMongoDB from "@/lib/mongodb"
import Project from "@/models/project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { id, title, description, img } = await request.json();
    await connectMongoDB();
    await Project.create({ id, title, description, img });
    return NextResponse.json({ message: "Project created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json({ projects });
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
}