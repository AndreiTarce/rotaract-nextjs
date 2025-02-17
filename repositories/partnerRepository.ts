import { IPartnerDocument } from '@/interfaces/partner/IPartner';
import Partner from '@/models/partner';
import { ObjectId } from 'mongodb';
import { Repository } from './repository';

export class PartnerRepository extends Repository<IPartnerDocument> {
    constructor() {
        super(Partner);
    }

    async findByIds(ids: string[]): Promise<IPartnerDocument[]> {
        const objectIds = ids.map((id) => new ObjectId(id));
        return this.model.find({ _id: { $in: objectIds } }).exec();
    }

    async findByName(name: string): Promise<IPartnerDocument[]> {
        return this.model.find({ name: { $regex: name, $options: 'i' } }).exec();
    }
}
