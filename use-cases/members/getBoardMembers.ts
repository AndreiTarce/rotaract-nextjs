import { MemberInteractor } from '@/interactors/memberInteractor';
import { MemberRepository } from '@/repositories/memberRepository';

const memberIntarctor = new MemberInteractor(new MemberRepository());

export async function getBoardMembers() {
    const boardMembers = await memberIntarctor.getMembersWithQuery({
        isBoard: true,
    });

    return boardMembers;
}
