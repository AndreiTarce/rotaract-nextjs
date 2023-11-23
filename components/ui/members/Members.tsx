import { getMembers } from '@/lib/entityService'
import MemberCard from './MemberCard'
import { IMember } from '@/models/member'

export default async function MembersList() {
    const { members }: { members: IMember[] } = await getMembers()
    const activeMembers = members.filter(
        (member: IMember) =>
            member.status === 'activ' && member.role === 'member'
    )
    return activeMembers.map((member: IMember, index: number) => (
        <MemberCard key={index} {...member} />
    ))
}
