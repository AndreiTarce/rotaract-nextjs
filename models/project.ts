import {
    IProjectDocument,
    IProjectPartner,
    IProjectSection,
} from '@/interfaces/IProject';
import mongoose, { Schema } from 'mongoose';

const SectionSchema = new Schema<IProjectSection>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    coverImg: { type: String },
});

const ProjectPartnerSchema = new Schema<IProjectPartner>({
    name: { type: String },
    logoUrl: { type: String },
    link: { type: String },
});

const projectSchema = new Schema<IProjectDocument>(
    {
        title: String,
        shortDescription: String,
        description: String,
        thumbnailImg: String,
        coverImg: String,
        images: [{ type: String }],
        url: String,
        sections: [SectionSchema],
        partners: [ProjectPartnerSchema],
        donation_link: String,
        cause_link: String,
    },
    {
        timestamps: true,
    }
);

const Project =
    mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
