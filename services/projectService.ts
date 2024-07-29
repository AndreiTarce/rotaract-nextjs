import { NotFoundError } from '@/app/api/utils/errors';
import { toProjectDto } from '@/dtos/project.dto';
import { IProject } from '@/interfaces/project/IProject';
import { IProjectRepository } from '@/interfaces/project/IProjectRepository';

export class ProjectService {
    private repository: IProjectRepository;

    constructor(repository: IProjectRepository) {
        this.repository = repository;
    }

    async getAllProjects() {
        const projects = await this.repository.findAll();
        return projects.map((project) => toProjectDto(project));
    }

    async getProjectById(id: string) {
        const project = await this.repository.findById(id);
        if (project) {
            return toProjectDto(project);
        }

        throw new NotFoundError();
    }

    async getProjectByUrl(url: string) {
        const project = await this.repository.findByUrl(url);
        if (project) {
            return toProjectDto(project);
        }

        throw new NotFoundError();
    }

    async createProject(project: IProject) {
        const createdProject = await this.repository.create(project);
        return toProjectDto(createdProject);
    }

    async updateProject(project: IProject) {
        const updatedProject = await this.repository.update(project);
        if (updatedProject) {
            return toProjectDto(updatedProject);
        }

        throw new NotFoundError();
    }

    async deleteProject(id: string) {
        await this.repository.delete(id);
    }
}
