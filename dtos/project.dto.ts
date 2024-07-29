import { IProject, IProjectDocument } from '@/interfaces/project/IProject';

export interface ProjectDto extends IProject {
    id: string;
}

export function toProjectDto(project: IProjectDocument): ProjectDto {
    return {
        id: project._id,
        title: project.title,
        shortDescription: project.shortDescription,
        description: project.description,
        thumbnailImg: project.thumbnailImg,
        coverImg: project.coverImg,
        images: project.images,
        url: project.url,
        sections: project.sections,
        partners: project.partners,
        donation_link: project.donation_link,
        cause_link: project.cause_link,
    };
}
