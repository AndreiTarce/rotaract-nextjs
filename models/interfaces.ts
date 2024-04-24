import { ObjectId } from 'mongodb'
import { z } from 'zod'

export interface IMemberLinks {
    facebook: string
    linkedin: string
    instagram: string
    tiktok: string
    website: string
}

export const IMemberLinksZodSchema = z.object({
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    website: z.string().optional(),
})

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
}

export enum memberStatus {
    ACTIV = 'activ',
    PASIV = 'pasiv',
    PAST = 'past',
    ASPIRANT = 'aspirant',
}

/**
 * @description Rotaract Member Interface
 *
 */
export interface IMember {
    _id: ObjectId
    id?: number
    first_name: string
    last_name: string
    picture: string
    description: string
    role: memberRoles
    urls: IMemberLinks
    start_mandate: number
    email: string
    status: memberStatus
    isBoard: boolean
}
