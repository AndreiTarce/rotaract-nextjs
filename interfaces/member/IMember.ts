import { Document } from 'mongoose';

export interface IMemberLinks {
    facebook: string;
    linkedin: string;
    instagram: string;
    tiktok: string;
    website: string;
}

export enum memberRoles {
    MEMBER = 'member',
    PRESIDENT = 'president',
    VICE_PRESIDENT = 'vice president',
    SECRETARY = 'secretary',
    TREASURER = 'treasurer',
    SERGEANT_AT_ARMS = 'sergeant at arms',
    PR_COORDINATOR = 'PR Coordinator',
    MARKETING_COORDINATOR = 'marketing coordinator',
    FUNDRAISING_DIRECTOR = 'fundraising director',
    PAST_PRESIDENT = 'past president',
}

export enum memberStatus {
    ACTIV = 'activ',
    PASIV = 'pasiv',
    PAST = 'past',
    ASPIRANT = 'aspirant',
}

export interface IMember {
    custom_id?: number;
    first_name: string;
    last_name: string;
    picture: string;
    description: string;
    role: memberRoles;
    urls?: IMemberLinks;
    start_mandate: number;
    email: string;
    status: memberStatus;
    isBoard: boolean;
}

export interface IMemberDocument extends IMember, Document {}
