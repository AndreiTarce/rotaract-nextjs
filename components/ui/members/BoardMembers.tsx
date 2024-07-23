import { IMember } from '@/interfaces/member/IMember';
import { getBoardMembers } from '@/lib/entityService';
import MemberCard from './MemberCard';

export default async function BoardMembersList() {
    const boardMembers = await getBoardMembers();
    boardMembers.sort((a, b) =>
        a.custom_id && b.custom_id ? a.custom_id - b.custom_id : 0
    );
    return boardMembers.map((member: IMember, index: number) => (
        <MemberCard key={index} {...member} />
    ));
}
