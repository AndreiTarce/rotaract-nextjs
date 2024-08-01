import { FilterQuery, SortOrder } from 'mongoose';
import { IPeriod } from '../IPeriod';
import { IRepository } from '../IRepository';
import { IMeetingDocument } from './IMeeting';

export type MeetingRepositoryFilterQuery = FilterQuery<IMeetingDocument>;

export interface IMeetingRepository extends IRepository<IMeetingDocument> {
    findAllWithQuery(
        filter: MeetingRepositoryFilterQuery,
        sort?:
            | string
            | { [key: string]: SortOrder | { $meta: any } }
            | [string, SortOrder][]
            | undefined
            | null
    ): Promise<IMeetingDocument[] | null>;
    count(type: string, period: IPeriod): Promise<number>;

    aggregateMemberPresences(
        memberId: string,
        type: string,
        period: IPeriod
    ): Promise<{ _id: null; totalPresences: number }[]>;
}
