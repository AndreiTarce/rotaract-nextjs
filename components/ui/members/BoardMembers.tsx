import { getBoardMembers } from "@/lib/entityService";
import MemberCard from "./MemberCard";
import { IMember } from "@/models/member";

export default async function BoardMembersList() {
    const boardMembers = await getBoardMembers();
    return boardMembers.map((member: IMember, index: number) => <MemberCard key={index} {...member} />)
}