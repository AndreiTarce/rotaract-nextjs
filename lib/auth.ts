import { MemberRepository } from '@/repositories/memberRepository';
import { MemberService } from '@/services/memberService';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

const allowedEmails = ['tarceandrei@gmail.com'];

const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);

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
            try {
                await memberService.getMemberByEmail(user.email || '');
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
};

export async function loginIsRequiredServer() {
    const session = await getServerSession(authConfig);
    if (!session) return redirect('/signin');
}
