import { FilterQuery, SortOrder } from 'mongoose';
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
}
