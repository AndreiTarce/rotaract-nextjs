import { IMemberDocument } from '@/interfaces/member/IMember';
import {
    IMemberRepository,
    MemberRepositoryFilterQuery,
} from '@/interfaces/member/IMemberRepository';
import Member from '@/models/member';
import { SortOrder } from 'mongoose';
import { Repository } from './repository';

export class MemberRepository extends Repository<IMemberDocument> implements IMemberRepository {
    constructor() {
        super(Member);
    }

    async findByName(name: string): Promise<IMemberDocument[] | null> {
        const members = await this.model.find({
            $or: [
                {
                    first_name: {
                        $regex: name,
                        $options: 'i',
                    },
                },
                {
                    last_name: {
                        $regex: name,
                        $options: 'i',
                    },
                },
            ],
        });

        return members;
    }

    async findByEmail(email: string): Promise<IMemberDocument | null> {
        const member = await this.model.findOne({ email: email }).exec();
        return member;
    }

    async deleteWithReturn(id: string): Promise<IMemberDocument | null> {
        const deletedMember = await this.findById(id);
        await this.delete(id);
        return deletedMember;
    }

    async findAllWithQuery(
        filter: MemberRepositoryFilterQuery,
        sort?:
            | string
            | { [key: string]: SortOrder | { $meta: any } }
            | [string, SortOrder][]
            | undefined
            | null
    ): Promise<IMemberDocument[] | null> {
        return this.model.find(filter).sort(sort);
    }
}
