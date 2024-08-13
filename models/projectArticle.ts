import { IProjectArticleDocument } from '@/interfaces/projectArticle/IProjectArticle';
import mongoose, { Schema } from 'mongoose';
import { projectPartnerSchema } from './project';

const projectArticleSchema = new Schema<IProjectArticleDocument>({
    projectId: String,
    year: Number,
    start_date: Date,
    end_date: Date,
    location: String,
    summary: String,
    coverImg: String,
    images: [String],
    articleBody: String,
    partners: [projectPartnerSchema],
});

const ProjectArticle =
    mongoose.models.ProjectArticle ||
    mongoose.model('ProjectArticle', projectArticleSchema);

export default ProjectArticle;
