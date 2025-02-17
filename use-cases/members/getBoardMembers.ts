import { MemberInteractor } from '@/interactors/memberInteractor';
import { memberRoles } from '@/interfaces/member/IMember';
import connectMongoDB from '@/lib/mongodb';
import { MemberRepository } from '@/repositories/memberRepository';

const memberInteractor = new MemberInteractor(new MemberRepository());

export async function getOrderedBoardMembers() {
    await connectMongoDB();

    const boardMembers = await memberInteractor.getMembersWithQuery({
        isBoard: true,
    });

    boardMembers.sort((a, b) => {
        const aWeight = boardRolesWeights.find((role) => role.role === a.role)?.weight || 0;
        const bWeight = boardRolesWeights.find((role) => role.role === b.role)?.weight || 0;

        return aWeight - bWeight;
    });

    return boardMembers;
}

const boardRolesWeights = [
    {
        role: memberRoles.PRESIDENT,
        weight: 1,
    },
    {
        role: memberRoles.VICE_PRESIDENT,
        weight: 2,
    },
    {
        role: memberRoles.SECRETARY,
        weight: 3,
    },
    {
        role: memberRoles.TREASURER,
        weight: 4,
    },
    {
        role: memberRoles.SERGEANT_AT_ARMS,
        weight: 5,
    },
    {
        role: memberRoles.PR_COORDINATOR,
        weight: 6,
    },
    {
        role: memberRoles.MARKETING_COORDINATOR,
        weight: 7,
    },
    {
        role: memberRoles.FUNDRAISING_DIRECTOR,
        weight: 8,
    },
    {
        role: memberRoles.PAST_PRESIDENT,
        weight: 9,
    },
];
