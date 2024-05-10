import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis'

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        console.log(request.headers.get('cookie'));
        const session = await getServerSession(authConfig);
        console.log(session);
        return NextResponse.json({ message: "Project created" }, { status: 201 })
    } catch (err) {
        console.log(err)
    }
}