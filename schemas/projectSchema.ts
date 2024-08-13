import { z } from 'zod';

export const projectFormSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    shortDescription: z.string(),
    body: z.string().optional(),
    thumbnailImg: z.any().optional(),
    coverImg: z.any().optional(),
    url: z.string(),
    partners: z.any().optional(),
});

export type IProjectFormSchema = z.infer<typeof projectFormSchema>;
