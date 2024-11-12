import { IProjectDocument } from '@/interfaces/project/IProject';
import Project from '@/models/project';
import { RegistrationInteractor } from './registrationInteractor';

export class CatrafusaleRegistrationInteractor extends RegistrationInteractor<
    IProjectDocument,
    typeof Project
> {
    constructor() {
        super(Project);
    }
}
