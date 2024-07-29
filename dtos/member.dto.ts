import { IMember, IMemberDocument } from '@/interfaces/member/IMember';

export interface MemberDto extends IMember {
    id: string;
}

export function toMemberDto(member: IMemberDocument): MemberDto {
    return {
        id: member._id,
        custom_id: member.custom_id,
        first_name: member.first_name,
        last_name: member.last_name,
        picture: member.picture,
        description: member.description,
        role: member.role,
        urls: member.urls,
        start_mandate: member.start_mandate,
        email: member.email,
        status: member.status,
        isBoard: member.isBoard,
    };
}
