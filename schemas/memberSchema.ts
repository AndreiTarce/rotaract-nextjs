import { MemberDto } from '@/dtos/member.dto';
import { memberRoles, memberStatus } from '@/interfaces/member/IMember';
import { z } from 'zod';

const memberLinksSchema = z.object({
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    website: z.string().optional(),
});

export const memberFormSchema = z.object({
    id: z.string().optional(),
    first_name: z.string().min(1, { message: 'First name is required.' }),
    last_name: z.string().min(1, { message: 'Last name is required.' }),
    picture_file: z.any().optional(),
    description: z.string().optional(),
    role: z.nativeEnum(memberRoles),
    urls: memberLinksSchema.optional(),
    start_mandate: z.number().optional(),
    email: z
        .string()
        .email('This is not a valid email')
        .min(1, { message: 'Email is required' }),
    status: z.nativeEnum(memberStatus),
    isBoard: z.boolean().optional(),
});

export const validateMemberFormData = (data: Partial<MemberDto>) => {
    return memberFormSchema.parse(data);
};

export enum memberFormStatuses {
    LOADING = 'loading',
    SUBMITTED = 'submitted',
    ERROR = 'error',
}

export type IMemberFormSchema = z.infer<typeof memberFormSchema>;
