import { IMember, memberRoles } from '@/models/interfaces'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isSecretary = (user: IMember) =>
    user?.role === memberRoles.SECRETARY || true

export const isBoard = (user: IMember) => user?.isBoard === true
