import { Document } from 'mongoose';

export interface IProjectSection {
    title: string;
    body: string;
    coverImg: string;
}

export interface IProjectPartner {
    name: string;
    logoUrl: string;
    link: string;
}

export interface IProject {
    title: string;
    shortDescription: string;
    description: string;
    thumbnailImg: string;
    coverImg: string;
    images: string[];
    url: string;
    sections: IProjectSection[];
    partners: IProjectPartner[];
    donation_link: string;
    cause_link: string;
}

export interface IProjectDocument extends IProject, Document {}
