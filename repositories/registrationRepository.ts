import { IRepository } from '@/interfaces/IRepository';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Repository } from './repository';

export class RegistrationRepository<T extends Document, S extends Model<T>>
    extends Repository<T>
    implements IRepository<T>
{
    constructor(model: S) {
        super(model);
    }

    async findOneAndUpdate(
        filter?: FilterQuery<T> | undefined,
        update?: UpdateQuery<T> | undefined
    ) {
        return await this.model.findOneAndUpdate(filter, update);
    }
}
