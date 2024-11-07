import { IMember, IMemberDocument } from '@/interfaces/member/IMember';
import { flattenObject } from './utils';

export interface MemberDto extends IMember {
    id: string;
}

export function toMemberDto(member: IMemberDocument): MemberDto {
    const memberObject = flattenObject(member);

    return {
        id: memberObject._id,
        custom_id: memberObject.custom_id,
        first_name: memberObject.first_name,
        last_name: memberObject.last_name,
        picture: memberObject.picture,
        description: memberObject.description,
        role: memberObject.role,
        urls: memberObject.urls,
        start_mandate: memberObject.start_mandate,
        email: memberObject.email,
        status: memberObject.status,
        isBoard: memberObject.isBoard,
    };
}
