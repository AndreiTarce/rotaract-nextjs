import { MeetingInteractor } from '@/interactors/meetingInteractor';
import { describe, expect, it, vi } from 'vitest';
import { MeetingRepository } from '../repositories/meetingRepository';

describe('MeetingsService', () => {
    it('should return empty array if no meetings found', async () => {
        vi.mock('../repositories/meetingRepository', () => {
            return {
                MeetingRepository: vi.fn().mockImplementation(() => {
                    return {
                        findAll: vi.fn().mockResolvedValue([]),
                    };
                }),
            };
        });

        const meetingInteractor = new MeetingInteractor(new MeetingRepository());
        const meetings = await meetingInteractor.getAllMeetings();

        expect(meetings).toEqual([]);
    }, 3000);
});
