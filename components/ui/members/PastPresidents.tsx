import { MemberDto } from '@/dtos/member.dto';
import { getPastPresidents } from '@/lib/entityService';
import MemberCard from './MemberCard';

export default async function PastPresidentsList() {
    const pastPresidents = await getPastPresidents();
    return <>test</>;
    return pastPresidents.map((member: MemberDto, index: number) => (
        <MemberCard key={index} {...member} />
    ));
}
