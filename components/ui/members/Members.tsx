import { MemberDto } from '@/dtos/member.dto';
import { getMembers } from '@/lib/entityService';
import MemberCard from './MemberCard';

export default async function MembersList() {
    const members: MemberDto[] = await getMembers();
    const activeMembers = members.filter(
        (member: MemberDto) =>
            member.status === 'activ' && member.role === 'member'
    );
    return activeMembers.map((member: MemberDto, index: number) => (
        <MemberCard key={index} {...member} />
    ));
}
