import { getMembers } from "@/lib/entityService";
import MemberCard from "./MemberCard";
import { IMember } from "@/models/member";

export default async function MembersList() {
    const { members }: { members: IMember[] } = await getMembers();
    return members.map((member: IMember, index: number) => (
        <MemberCard key={index} {...member} />
    ))
}