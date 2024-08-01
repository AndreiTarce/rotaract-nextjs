import { MemberDto } from '@/dtos/member.dto';
import { getOrderedPastPresidents } from '@/use-cases/members/getOrderedPastPresidents';
import MemberCard from './MemberCard';

export default async function PastPresidentsList() {
    const pastPresidents: MemberDto[] = await getOrderedPastPresidents();

    return pastPresidents.map((member: MemberDto, index: number) => (
        <MemberCard key={index} {...member} />
    ));
}
