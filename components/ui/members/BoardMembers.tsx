import { getBoardMembers } from "@/lib/entityService";
import MemberCard from "./MemberCard";
import { IMember } from "@/models/member";

export default async function BoardMembersList() {
    const boardMembers = await getBoardMembers();
    boardMembers.sort((a, b) => a.id - b.id)
    return boardMembers.map((member: IMember, index: number) => <MemberCard key={index} {...member} />)
}