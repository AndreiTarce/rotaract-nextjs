import { IRepository } from '@/interfaces/IRepository';
import { Document, Model } from 'mongoose';
import { Repository } from './repository';

export class RegistrationRepository<T extends Document, S extends Model<T>>
    extends Repository<T>
    implements IRepository<T>
{
    constructor(model: S) {
        super(model);
    }
}
