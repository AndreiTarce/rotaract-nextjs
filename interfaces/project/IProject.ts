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

export interface IProjectDocument extends IProject, Document {}
export interface IProjectPartnerDocument extends IProjectPartner, Document {}
