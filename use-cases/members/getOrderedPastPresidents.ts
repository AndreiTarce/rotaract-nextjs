import { MemberInteractor } from '@/interactors/memberInteractor';
import { MemberRepository } from '@/repositories/memberRepository';

const memberInteractor = new MemberInteractor(new MemberRepository());

export async function getOrderedPastPresidents() {
    const pastPresidents = await memberInteractor.getMembersWithQuery({
        role: 'past president',
    });

    return pastPresidents;
}
