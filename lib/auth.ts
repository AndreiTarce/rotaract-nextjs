import { MemberInteractor } from '@/interactors/memberInteractor';
import { MemberRepository } from '@/repositories/memberRepository';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user.email) {
                return false;
            }

            try {
                getMemberByEmail(user.email);
                return true;
            } catch (error) {
                return false;
            }
        },
    },
};

const getMemberByEmail = async (email: string) => {
    const memberInteractor = new MemberInteractor(new MemberRepository());
    await memberInteractor.getMemberByEmail(email);
};

export async function loginIsRequiredServer() {
    const session = await getServerSession(authConfig);
    if (!session) return redirect('/signin');
}
