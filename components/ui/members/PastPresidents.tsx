import { getBoardMembers } from "@/lib/entityService";
import MemberCard from "./MemberCard";
import { IMember } from "@/models/member";

export default async function PastPresidentsList() {
    // const boardMembers = await getBoardMembers();
    // return boardMembers.map((member: IMember, index: number) => <MemberCard key={index} {...member} />)
    return <>Past presidents list</>
}