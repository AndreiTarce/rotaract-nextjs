import {
    IFeaturedProject,
    IFeaturedProjectDocument,
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

export interface FeaturedProjectDto extends IFeaturedProject {
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
        partners: project.partners.map((partner) => ({
            id: partner.id,
            partnerId: partner.partnerId,
        })),
    };
}

export function toFeaturedProjectDto(
    featuredProject: IFeaturedProjectDocument
): FeaturedProjectDto {
    return {
        id: featuredProject.id,
        projectId: featuredProject.projectId,
        cause_link: featuredProject.cause_link,
        CTA_link: featuredProject.CTA_link,
        start_date: featuredProject.start_date,
        end_date: featuredProject.end_date,
        type: featuredProject.type,
    };
}
