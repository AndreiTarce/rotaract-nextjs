import { NotFoundError } from '@/app/api/utils/errors';
import { ProjectDto, toProjectDto } from '@/dtos/project.dto';
import { IProjectRepository } from '@/interfaces/project/IProjectRepository';

export class ProjectInteractor {
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

    async createProject(project: Partial<ProjectDto>) {
        const createdProject = await this.repository.create(project);
        return toProjectDto(createdProject);
    }

    async updateProject(project: Partial<ProjectDto>) {
        const updatedProject = await this.repository.update(project);
        if (updatedProject) {
            return toProjectDto(updatedProject);
        }

        throw new NotFoundError();
    }

    async deleteProject(id: string) {
        await this.repository.delete(id);
    }

    async deleteProjectWithReturn(id: string) {
        const deletedProject = await this.repository.deleteWithReturn(id);
        return deletedProject;
    }
}
