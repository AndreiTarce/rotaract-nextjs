import {
    IProject,
    IProjectDocument,
    IProjectPartner,
} from '@/interfaces/project/IProject';

export interface ProjectDto extends IProject {
    id: string;
}

export interface ProjectPartnerDto extends IProjectPartner {
    id: string;
}

export function toProjectDto(project: IProjectDocument): ProjectDto {
    return {
        id: project.id,
        name: project.name,
        shortDescription: project.shortDescription,
        body: project.body,
        thumbnailImg: project.thumbnailImg,
        coverImg: project.coverImg,
        images: project.images,
        url: project.url,
        partners: project.partners,
    };
}
