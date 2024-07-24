import { NotFoundError } from '@/app/api/utils/errors';
import { MemberDto, toMemberDto } from '@/dtos/member.dto';
import { IMemberDocument } from '@/interfaces/member/IMember';
import { IMemberRepository } from '@/interfaces/member/IMemberRepository';

export class MemberService {
    private repository: IMemberRepository;

    constructor(repository: IMemberRepository) {
        this.repository = repository;
    }

    async getAllMembers() {
        const members = await this.repository.findAll();
        if (members) {
            return members.map((member: IMemberDocument) =>
                toMemberDto(member)
            );
        }
    }

    async getMembersByName(name: string) {
        const members = await this.repository.findByName(name);

        if (members) {
            return members.map((member: IMemberDocument) =>
                toMemberDto(member)
            );
        }
    }

    async getMemberById(id: string) {
        const member = await this.repository.findById(id);

        if (member) {
            return toMemberDto(member);
        }

        throw new NotFoundError();
    }

    async getMemberByEmail(email: string) {
        const member = await this.repository.findByEmail(email);

        if (member) {
            return toMemberDto(member);
        }

        throw new NotFoundError();
    }

    async createMember(member: Partial<MemberDto>) {
        const createdMember = await this.repository.create(member);
        return toMemberDto(createdMember);
    }

    async deleteMember(id: string) {
        await this.repository.delete(id);
    }

    async deleteMemberWithReturn(id: string) {
        const deletedMember = await this.repository.deleteWithReturn(id);
        if (deletedMember) {
            return toMemberDto(deletedMember);
        }
    }
}
