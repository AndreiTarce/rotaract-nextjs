import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { redirect } from 'next/navigation'


export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
}

export async function loginIsRequiredServer() {
    const session = await getServerSession(authConfig);
    if (!session) return redirect('/signin');
}