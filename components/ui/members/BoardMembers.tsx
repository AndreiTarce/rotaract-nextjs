import { MemberDto } from '@/dtos/member.dto';
import { getOrderedBoardMembers } from '@/use-cases/members/getBoardMembers';
import MemberCard from './MemberCard';

export default async function BoardMembersList() {
    const boardMembers = await getOrderedBoardMembers();

    return boardMembers.map((member: MemberDto, index: number) => (
        <MemberCard key={index} {...member} />
    ));
}
