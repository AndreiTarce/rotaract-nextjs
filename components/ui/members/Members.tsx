import { MemberDto } from '@/dtos/member.dto';
import { MemberInteractor } from '@/interactors/memberInteractor';
import { MemberRepository } from '@/repositories/memberRepository';
import MemberCard from './MemberCard';

const memberInteractor = new MemberInteractor(new MemberRepository());

export default async function MembersList() {
    const members = await memberInteractor.getAllMembers();
    const activeMembers = members?.filter(
        (member: MemberDto) =>
            member.status === 'activ' && member.role === 'member'
    );
    return activeMembers?.map((member: MemberDto, index: number) => (
        <MemberCard key={index} {...member} />
    ));
}
