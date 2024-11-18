import {
    IFeaturedProject,
    IFeaturedProjectDocument,
    IProject,
    IProjectDocument,
    IProjectPartner,
} from '@/interfaces/project/IProject';
import { flattenObject } from './utils';

export interface ProjectDto extends IProject {
    id: string;
}

export interface ProjectPartnerDto extends IProjectPartner {
    id: string;
}

export interface FeaturedProjectDto extends IFeaturedProject {
    id: string;
}

export function toProjectDto(project: IProjectDocument): ProjectDto {
    const projectObject = flattenObject(project);
    return {
        id: projectObject._id,
        name: projectObject.name,
        shortDescription: projectObject.shortDescription,
        body: projectObject.body,
        thumbnailImg: projectObject.thumbnailImg,
        coverImg: projectObject.coverImg,
        images: projectObject.images,
        url: projectObject.url,
        partners: projectObject.partners,
    };
}

export function toFeaturedProjectDto(
    featuredProject: IFeaturedProjectDocument
): FeaturedProjectDto {
    const featuredProjectObject = flattenObject(featuredProject);

    return {
        id: featuredProjectObject._id,
        projectId: featuredProjectObject.projectId,
        cause_link: featuredProjectObject.cause_link,
        CTA_link: featuredProjectObject.CTA_link,
        start_date: featuredProjectObject.start_date,
        end_date: featuredProjectObject.end_date,
        type: featuredProjectObject.type,
    };
}
