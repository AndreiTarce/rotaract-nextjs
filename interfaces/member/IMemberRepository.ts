import { IRepository } from '../IRepository';
import { IMemberDocument } from './IMember';

export interface IMemberRepository extends IRepository<IMemberDocument> {
    findByName(name: string): Promise<IMemberDocument[] | null>;
    deleteWithReturn(id: string): Promise<IMemberDocument | null>;
    findByEmail(email: string): Promise<IMemberDocument | null>;
}
