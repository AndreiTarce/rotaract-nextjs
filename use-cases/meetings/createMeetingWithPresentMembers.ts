import { MeetingDto, toMeetingDto } from '@/dtos/meeting.dto';
import { MeetingInteractor } from '@/interactors/meetingInteractor';
import { MemberInteractor } from '@/interactors/memberInteractor';
import { MeetingRepository } from '@/repositories/meetingRepository';
import { MemberRepository } from '@/repositories/memberRepository';

const memberInteractor = new MemberInteractor(new MemberRepository());
const meetingInteractor = new MeetingInteractor(new MeetingRepository());

export async function createMeetingWithPresentMembers(
    meeting: MeetingDto
): Promise<MeetingDto> {
    const members = await memberInteractor.getAllMembers();

    const absentMembers = members
        .filter(
            (member) =>
                !meeting.presentMembers.some(
                    (presentMember) => presentMember.id === member.id
                )
        )
        .map((member) => member);

    const meetingToCreate = toMeetingDto({
        ...meeting,
        absentMembers,
    });

    const createdMeeting =
        await meetingInteractor.createMeeting(meetingToCreate);
    return createdMeeting;
}
