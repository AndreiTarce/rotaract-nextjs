import { IPeriod } from '@/interfaces/IPeriod';
import { IMeetingDocument } from '@/interfaces/meeting/IMeeting';
import {
    IMeetingRepository,
    MeetingRepositoryFilterQuery,
} from '@/interfaces/meeting/IMeetingRepository';
import Meeting from '@/models/meeting';
import { ObjectId } from 'mongodb';
import { SortOrder } from 'mongoose';
import { Repository } from './repository';

export class MeetingRepository extends Repository<IMeetingDocument> implements IMeetingRepository {
    constructor() {
        super(Meeting);
    }

    async findAllWithQuery(
        filter: MeetingRepositoryFilterQuery,
        sort?:
            | string
            | { [key: string]: SortOrder | { $meta: any } }
            | [string, SortOrder][]
            | undefined
            | null
    ): Promise<IMeetingDocument[] | null> {
        return this.model.find(filter).sort(sort);
    }

    async count(type: string, period: IPeriod): Promise<number> {
        return this.model.countDocuments({
            type,
            start_date: {
                $gte: period.startDate,
                $lte: period.endDate,
            },
        });
    }

    async aggregateMemberPresences(memberId: string, type: string, period: IPeriod) {
        return this.model
            .aggregate()
            .unwind('$presentMembers')
            .match({
                'presentMembers._id': new ObjectId(memberId),
                type,
                start_date: {
                    $gte: period.startDate,
                    $lte: period.endDate,
                },
            })
            .group({ _id: null, totalPresences: { $sum: 1 } });
    }
}
