import { getBoardMembers } from '@/lib/entityService'
import MemberCard from './MemberCard'
import { IMember } from '@/models/interfaces'

export default async function BoardMembersList() {
    const boardMembers = await getBoardMembers()
    boardMembers.sort((a, b) => (a.id && b.id ? a.id - b.id : 0))
    return boardMembers.map((member: IMember, index: number) => (
        <MemberCard key={index} {...member} />
    ))
}
