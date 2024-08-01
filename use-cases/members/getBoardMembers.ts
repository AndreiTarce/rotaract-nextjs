import { MemberInteractor } from '@/interactors/memberInteractor';
import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';

const memberIntarctor = new MemberInteractor(new MemberRepository());

export async function getBoardMembers() {
    await connectMongoDB();

    const boardMembers = await memberIntarctor.getMembersWithQuery({
        isBoard: true,
    });

    return boardMembers;
}
