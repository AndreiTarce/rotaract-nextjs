import { MeetingInteractor } from '@/interactors/meetingInteractor';
import { IPeriod } from '@/interfaces/IPeriod';
import { IMemberAttendance } from '@/interfaces/meeting/IMemberAttendance';
import { ROTARIAN_YEAR_END_DATE, ROTARIAN_YEAR_START_DATE } from '@/lib/constants';
import { MeetingRepository } from '@/repositories/meetingRepository';

const meetingInteractor = new MeetingInteractor(new MeetingRepository());

const currentRotarianYear = {
    startDate: ROTARIAN_YEAR_START_DATE,
    endDate: ROTARIAN_YEAR_END_DATE,
};

export async function getMemberAttendance(
    memberId: string,
    type: string = 'Sedinta Club',
    start_date?: string,
    end_date?: string
): Promise<IMemberAttendance> {
    //TODO: validate the input and throw validation error if something is not right

    const period: IPeriod = {
        startDate: start_date ? new Date(start_date) : currentRotarianYear.startDate,
        endDate: end_date ? new Date(end_date) : currentRotarianYear.endDate,
    };

    const numberOfMeetings = await meetingInteractor.getNumberOfMeetings(type, period);

    const presences = await meetingInteractor.getMemberPresences(memberId, type, period);

    const absences = numberOfMeetings - presences;

    return {
        memberId,
        type,
        period,
        presences,
        absences,
    };
}
