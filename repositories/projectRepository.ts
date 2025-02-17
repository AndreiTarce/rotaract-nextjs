import { IProjectDocument } from '@/interfaces/project/IProject';
import { IProjectRepository } from '@/interfaces/project/IProjectRepository';
import Project from '@/models/project';
import { Repository } from './repository';

export class ProjectRepository extends Repository<IProjectDocument> implements IProjectRepository {
    constructor() {
        super(Project);
    }

    async findByUrl(url: string): Promise<IProjectDocument | null> {
        return this.model.findOne({ url: url });
    }

    async deleteWithReturn(id: string): Promise<IProjectDocument | null> {
        const deletedProject = await this.findById(id);
        await this.delete(id);
        return deletedProject;
    }
}
