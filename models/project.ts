import { IProjectDocument, IProjectPartner } from '@/interfaces/project/IProject';
import mongoose, { Schema } from 'mongoose';

export const projectPartnerSchema = new Schema<IProjectPartner>({
    partnerId: String,
});

const projectSchema = new Schema<IProjectDocument>({
    name: String,
    shortDescription: String,
    body: String,
    thumbnailImg: String,
    coverImg: String,
    images: [String],
    url: String,
    partners: [projectPartnerSchema],
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
