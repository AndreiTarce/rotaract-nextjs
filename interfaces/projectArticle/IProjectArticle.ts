import { ProjectPartnerDto } from '@/dtos/project.dto';
import { Document } from 'mongoose';

export interface IProjectArticle {
    projectId: string;
    year: number;
    start_date: Date;
    end_date: Date;
    location: string;
    summary: string;
    coverImg: string;
    images: string[];
    articleBody: string;
    partners: ProjectPartnerDto[];
}

export interface IProjectArticleDocument extends IProjectArticle, Document {}
