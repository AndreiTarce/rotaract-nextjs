import { IMember, memberRoles } from '@/interfaces/member/IMember';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isSecretary = (user: IMember) => {
    if (Boolean(process.env.NEXT_PUBLIC_isAdmin)) return true;
    return user?.role === memberRoles.SECRETARY ? true : false;
};

export const isBoard = (user: IMember) => user?.isBoard === true;
