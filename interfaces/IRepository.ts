export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(item: Partial<T>): Promise<T>;
    update(item: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
}
