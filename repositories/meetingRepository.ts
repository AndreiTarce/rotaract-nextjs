import { IMeetingDocument } from '@/interfaces/meeting/IMeeting';
import { IMeetingRepository } from '@/interfaces/meeting/IMeetingRepository';
import Meeting from '@/models/meeting';
import { FilterQuery, SortOrder } from 'mongoose';
import { Repository } from './repository';

export class MeetingRepository
    extends Repository<IMeetingDocument>
    implements IMeetingRepository
{
    constructor() {
        super(Meeting);
    }

    findAllWithQuery(
        filter: FilterQuery<IMeetingDocument>,
        sort?:
            | string
            | { [key: string]: SortOrder | { $meta: any } }
            | [string, SortOrder][]
            | undefined
            | null
    ): Promise<IMeetingDocument[] | null> {
        return this.model.find(filter).sort(sort);
    }
}
