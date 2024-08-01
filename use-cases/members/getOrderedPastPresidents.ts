import { MemberInteractor } from '@/interactors/memberInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';

const memberInteractor = new MemberInteractor(new MemberRepository());

export async function getOrderedPastPresidents() {
    await connectMongoDB();

    const pastPresidents = await memberInteractor.getMembersWithQuery({
        role: 'past president',
    });

    return pastPresidents;
}
