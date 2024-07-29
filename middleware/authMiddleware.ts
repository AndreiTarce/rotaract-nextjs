import { NextRequest, NextResponse } from 'next/server';

export async function authMiddleware(request: NextRequest) {
    const cookies = request.cookies;

    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    const secureString =
        process.env.NODE_ENV === 'production' ? '__Secure-' : '';

    if (!cookies.get(secureString + 'next-auth.session-token')?.value?.trim()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const headers = {
        'Content-Type': 'application/json',
        Cookie: cookies.toString(),
    };
    const url = `${process.env.BASE_URL}/api/auth/session`;

    const response = await fetch(url, {
        headers,
        cache: 'no-store',
    });

    if (response.ok) {
        return NextResponse.next();
    }

    return new NextResponse('Unathorized', { status: 401 });
}
