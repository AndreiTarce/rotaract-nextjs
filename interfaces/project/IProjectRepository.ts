import { IRepository } from '../IRepository';
import { IProjectDocument } from './IProject';

export interface IProjectRepository extends IRepository<IProjectDocument> {
    findByUrl(url: string): Promise<IProjectDocument | null>;
}
