import { toFeaturedProjectDto } from '@/dtos/project.dto';
import { IRepository } from '@/interfaces/IRepository';
import { IFeaturedProjectDocument } from '@/interfaces/project/IProject';

export class FeaturedProjectInteractor {
    private repository: IRepository<IFeaturedProjectDocument>;

    constructor(repository: IRepository<IFeaturedProjectDocument>) {
        this.repository = repository;
    }

    async getProject() {
        const projects = await this.repository.findAll();
        return toFeaturedProjectDto(projects[0]);
    }
}
