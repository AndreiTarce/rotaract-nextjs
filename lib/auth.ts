import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';
import { getMemberWhitelist } from './entityService';
import { IMember } from '@/models/member';


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
    const whitelistedMembers = await getMemberWhitelist();
    const isWhitelisted = Boolean(whitelistedMembers.filter(member => member.email === session?.user?.email).length);
    if (!isWhitelisted) return redirect('/signin?whitelisted=false');
}

export const isSecretary = (user: IMember) => user?.role === 'Secretar'
