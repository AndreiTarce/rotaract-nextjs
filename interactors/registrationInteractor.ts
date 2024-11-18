import { RegistrationRepository } from '@/repositories/registrationRepository';
import { Document, Model } from 'mongoose';

export class RegistrationInteractor<T extends Document, S extends Model<T>> {
    protected repository: RegistrationRepository<T, S>;

    constructor(model: S) {
        this.repository = new RegistrationRepository(model);
    }

    async getRegistrations(): Promise<T[] | any[]> {
        const registrations = await this.repository.findAll();
        return registrations;
    }

    async createRegistration(registration: Partial<T>): Promise<T | any> {
        const createdRegistration = await this.repository.create(registration);
        return createdRegistration;
    }
}
