import connectMongoDB from "@/lib/mongodb"
import Meeting from "@/models/meeting";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//     const project = await request.json();
//     await connectMongoDB();
//     await Project.create(project);
//     return NextResponse.json({ message: "Project created" }, { status: 201 });
// }

export async function GET(request: NextRequest) {
    const api_key = request.nextUrl.searchParams.get('api_key');
    if (api_key === process.env.API_KEY) {
        await connectMongoDB();
        const meetings = await Meeting.find();
        return NextResponse.json({ meetings });
    }
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
}

// export async function DELETE(request: NextRequest) {
//     const { id } = await request.json();
//     await connectMongoDB();
//     await Project.findByIdAndDelete(id);
//     return NextResponse.json({ message: "Project deleted" }, { status: 200 });
// }