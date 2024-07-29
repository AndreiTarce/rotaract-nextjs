import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middleware/authMiddleware';

export async function middleware(request: NextRequest) {
    const authResponse = await authMiddleware(request);

    if (authResponse) return authResponse;

    return NextResponse.next();
}

export const config = { matcher: ['/api/meetings'] };
