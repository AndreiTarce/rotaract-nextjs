import { getPastPresidents } from '@/lib/entityService'
import { IMember } from '@/models/interfaces'
import MemberCard from './MemberCard'

export default async function PastPresidentsList() {
    const pastPresidents = await getPastPresidents()
    return pastPresidents.map((member: IMember, index: number) => (
        <MemberCard key={index} {...member} />
    ))
}
