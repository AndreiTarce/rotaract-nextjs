import { MemberRepository } from '@/repositories/memberRepository';
import { describe, expect, it, vi } from 'vitest';
import { MeetingRepository } from '../repositories/meetingRepository';
import { MeetingService } from '../services/meetingService';

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

        const meetingService = new MeetingService(
            new MeetingRepository(),
            new MemberRepository()
        );
        const meetings = await meetingService.getAllMeetings();

        expect(meetings).toEqual([]);
    }, 3000);
});
