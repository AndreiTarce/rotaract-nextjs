import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        console.log(request.headers.get('cookie'));
        const session = await getServerSession(authConfig);
        console.log(session);
        return NextResponse.json({ message: 'Project created' }, { status: 201 });
    } catch (err) {
        console.log(err);
    }
}
