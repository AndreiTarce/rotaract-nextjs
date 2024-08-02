import { MemberInteractor } from '@/interactors/memberInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';

const memberIntarctor = new MemberInteractor(new MemberRepository());

export async function getOrderedBoardMembers() {
    await connectMongoDB();

    const boardMembers = await memberIntarctor.getMembersWithQuery({
        isBoard: true,
    });

    boardMembers.sort((a, b) =>
        a.custom_id && b.custom_id ? a.custom_id - b.custom_id : 0
    );

    return boardMembers;
}
