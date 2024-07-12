import { IProjectDocument } from './IProject';
import { IRepository } from './IRepository';

export interface IProjectRepository extends IRepository<IProjectDocument> {
    findByUrl(url: string): Promise<IProjectDocument | null>;
}
