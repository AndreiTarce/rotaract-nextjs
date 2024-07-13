import { IMember } from '@/interfaces/member/IMember';
import { getPastPresidents } from '@/lib/entityService';
import MemberCard from './MemberCard';

export default async function PastPresidentsList() {
    const pastPresidents = await getPastPresidents();
    return pastPresidents.map((member: IMember, index: number) => (
        <MemberCard key={index} {...member} />
    ));
}
