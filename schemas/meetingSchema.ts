import { z } from 'zod';

export const meetingSchema = z.object({
    type: z.string().min(1, {
        message: 'Type is required.',
    }),
    start_date: z.date(),
    location: z.string().min(1, {
        message: 'Location is required.',
    }),
    minuteAuthor: z.string(),
    minuteUrl: z.string().min(1, {
        message: 'Url is required.',
    }),
    highlights: z.string(),
    presentMembers: z.array(z.any()).refine(
        (data) => {
            return data.length;
        },
        {
            message: 'At least one member must be present.',
        }
    ),
    start_hour: z.string().min(1, {
        message: 'Hour is required',
    }),
});
