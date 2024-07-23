import { IMember, IMemberDocument } from '@/interfaces/member/IMember';
import { Types } from 'mongoose';

export interface MemberDto extends IMember {
    _id: Types.ObjectId;
}

export function toMemberDto(member: IMemberDocument): MemberDto {
    return {
        _id: member._id,
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
