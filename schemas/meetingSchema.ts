import { MeetingDto } from '@/dtos/meeting.dto';
import { z } from 'zod';

export const meetingFormSchema = z.object({
    type: z.string().min(1, {
        message: 'Type is required.',
    }),
    start_date: z.preprocess(
        (arg) => {
            if (typeof arg === 'string' || arg instanceof Date) {
                return new Date(arg);
            }
            return arg;
        },
        z.date().refine((date) => !isNaN(date.getTime()), {
            message: 'Invalid date format.',
        })
    ),
    location: z.string().min(1, {
        message: 'Location is required.',
    }),
    minuteAuthor: z.string(),
    minuteAuthorId: z.string(),
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

export const validateMeetingFormData = (data: Partial<MeetingDto>) => {
    return meetingFormSchema.parse(data);
};

export type IMeetingFormSchema = z.infer<typeof meetingFormSchema>;
