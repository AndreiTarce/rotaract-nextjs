import { IProject } from '@/interfaces/IProject';
import { IProjectRepository } from '@/interfaces/IProjectRepository';

export class ProjectService {
    private repository: IProjectRepository;

    constructor(repository: IProjectRepository) {
        this.repository = repository;
    }

    async getAllProjects() {
        const projects = await this.repository.findAll();
        return projects;
    }

    async getProjectByUrl(url: string) {
        const project = await this.repository.findByUrl(url);
        return project;
    }

    async createProject(project: IProject) {
        const createdProject = await this.repository.create(project);
        return createdProject;
    }

    async updateProject(project: IProject) {
        const updatedProject = await this.repository.update(project);
        return updatedProject;
    }

    async deleteProject(id: string) {
        await this.repository.delete(id);
    }
}
