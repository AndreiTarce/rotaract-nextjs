import { IMember } from '@/interfaces/member/IMember';
import { getMembers } from '@/lib/entityService';
import MemberCard from './MemberCard';

export default async function MembersList() {
    const members: IMember[] = await getMembers();
    const activeMembers = members.filter(
        (member: IMember) =>
            member.status === 'activ' && member.role === 'member'
    );
    return activeMembers.map((member: IMember, index: number) => (
        <MemberCard key={index} {...member} />
    ));
}
