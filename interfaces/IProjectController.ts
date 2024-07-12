import { IProject, IProjectDocument } from './IProject';

export interface IProjectController {
    onCreateProject(project: IProject): Promise<IProjectDocument>;
    onGetProject(id: string): Promise<IProjectDocument | null>;
    onGetProjects(): Promise<IProjectDocument[]>;
    onDeleteProject(id: string): Promise<void>;
    onUpdateProject(project: IProject): Promise<IProjectDocument | null>;
}
