import { FilterQuery, SortOrder } from 'mongoose';
import { IRepository } from '../IRepository';
import { IMemberDocument } from './IMember';

export type MemberRepositoryFilterQuery = FilterQuery<IMemberDocument>;

export interface IMemberRepository extends IRepository<IMemberDocument> {
    findByName(name: string): Promise<IMemberDocument[] | null>;
    deleteWithReturn(id: string): Promise<IMemberDocument | null>;
    findByEmail(email: string): Promise<IMemberDocument | null>;
    findAllWithQuery(
        filter: MemberRepositoryFilterQuery,
        sort?:
            | string
            | { [key: string]: SortOrder | { $meta: any } }
            | [string, SortOrder][]
            | undefined
            | null
    ): Promise<IMemberDocument[] | null>;
}
