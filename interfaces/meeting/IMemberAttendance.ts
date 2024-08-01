import { IPeriod } from '../IPeriod';

export interface IMemberAttendance {
    memberId: string;
    type: string;
    period: IPeriod;
    presences: number;
    absences: number;
}
