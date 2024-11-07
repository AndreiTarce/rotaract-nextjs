import { ProjectPartnerDto } from '@/dtos/project.dto';
import { Document } from 'mongoose';

export interface IProject {
    name: string;
    shortDescription: string;
    body: string;
    thumbnailImg: string;
    coverImg: string;
    images: string[];
    url: string;
    partners: ProjectPartnerDto[];
}

export interface IProjectPartner {
    partnerId: string;
}

export interface IFeaturedProject {
    projectId: string;
    start_date: Date;
    end_date: Date;
    CTA_link: string;
    cause_link: string;
    type: FeaturedProjectActionType;
}

export enum FeaturedProjectActionType {
    DONATION = 'donation',
    REGISTRATION = 'registration',
}

export interface IProjectDocument extends IProject, Document {}
export interface IProjectPartnerDocument extends IProjectPartner, Document {}
export interface IFeaturedProjectDocument extends IFeaturedProject, Document {}
