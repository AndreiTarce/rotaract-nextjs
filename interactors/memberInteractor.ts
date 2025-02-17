import { NotFoundError } from '@/app/api/utils/errors';
import { MemberDto, toMemberDto } from '@/dtos/member.dto';
import { IMemberDocument } from '@/interfaces/member/IMember';
import {
    IMemberRepository,
    MemberRepositoryFilterQuery,
} from '@/interfaces/member/IMemberRepository';

export class MemberInteractor {
    private memberRepository: IMemberRepository;

    constructor(memberRepository: IMemberRepository) {
        this.memberRepository = memberRepository;
    }

    async getAllMembers() {
        const members = await this.memberRepository.findAll();
        return members.map((member: IMemberDocument) => toMemberDto(member));
    }

    async getMembersByName(name: string) {
        const members = await this.memberRepository.findByName(name);

        if (members) {
            return members.map((member: IMemberDocument) => toMemberDto(member));
        }
    }

    async getMembersWithQuery(filter: MemberRepositoryFilterQuery) {
        let searchFilter: MemberRepositoryFilterQuery = {};

        if (filter.isBoard) {
            searchFilter.isBoard = filter.isBoard;
        }

        if (filter.role) {
            searchFilter.role = filter.role;
        }

        const members = await this.memberRepository.findAllWithQuery(searchFilter);

        if (members) {
            return members.map((member: IMemberDocument) => toMemberDto(member));
        }

        throw new NotFoundError();
    }

    async getMemberById(id: string) {
        const member = await this.memberRepository.findById(id);

        if (member) {
            return toMemberDto(member);
        }

        throw new NotFoundError();
    }

    async getMemberByEmail(email: string) {
        const member = await this.memberRepository.findByEmail(email);

        if (member) {
            return toMemberDto(member);
        }

        throw new NotFoundError();
    }

    async createMember(member: Partial<MemberDto>) {
        const createdMember = await this.memberRepository.create(member);
        return toMemberDto(createdMember);
    }

    async deleteMember(id: string) {
        await this.memberRepository.delete(id);
    }

    async deleteMemberWithReturn(id: string) {
        const deletedMember = await this.memberRepository.deleteWithReturn(id);
        if (deletedMember) {
            return toMemberDto(deletedMember);
        }

        throw new NotFoundError();
    }

    async updateMember(member: Partial<MemberDto>) {
        const updatedMember = await this.memberRepository.update(member);
        if (updatedMember) {
            return toMemberDto(updatedMember);
        }

        throw new NotFoundError();
    }
}
