import { IRepository } from '@/interfaces/IRepository';
import { Document, Model } from 'mongoose';

export class Repository<T extends Document> implements IRepository<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async create(item: Partial<T>): Promise<T> {
        return this.model.create(item);
    }

    async update(item: Partial<T>): Promise<T | null> {
        return this.model
            .findByIdAndUpdate(item.id, item, { new: true })
            .exec();
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id).exec();
    }
}
