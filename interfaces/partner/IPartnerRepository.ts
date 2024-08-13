import { IRepository } from '../IRepository';
import { IPartnerDocument } from './IPartner';

export interface IPartnerRepository extends IRepository<IPartnerDocument> {
    findByIds: (ids: string[]) => Promise<IPartnerDocument[]>;
    findByName: (name: string) => Promise<IPartnerDocument[]>;
}
