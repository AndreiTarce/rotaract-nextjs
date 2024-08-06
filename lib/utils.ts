import { MemberDto } from '@/dtos/member.dto';
import { memberRoles } from '@/interfaces/member/IMember';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isSecretary = (user: MemberDto) => {
    if (Boolean(process.env.NEXT_PUBLIC_isAdmin)) return true;
    return user?.role === memberRoles.SECRETARY ? true : false;
};

export const isBoard = (user: MemberDto) => user?.isBoard === true;

export const memberIsBoardBasedOnRole = (member: MemberDto) =>
    !(
        member.role === memberRoles.MEMBER ||
        member.role === memberRoles.PAST_PRESIDENT
    );

export const memberIsCurrentPastPresident = (member: MemberDto) =>
    member.role === memberRoles.PAST_PRESIDENT &&
    member.start_mandate === new Date().getFullYear() - 1;
