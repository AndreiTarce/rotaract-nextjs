import { MemberDto } from '@/dtos/member.dto';
import { getBoardMembers } from '@/lib/entityService';
import MemberCard from './MemberCard';

export default async function BoardMembersList() {
    const boardMembers = await getBoardMembers();
    boardMembers.sort((a, b) =>
        a.custom_id && b.custom_id ? a.custom_id - b.custom_id : 0
    );
    return boardMembers.map((member: MemberDto, index: number) => (
        <MemberCard key={index} {...member} />
    ));
}
