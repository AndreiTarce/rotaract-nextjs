import { FeaturedProjectActionType, IFeaturedProjectDocument } from '@/interfaces/project/IProject';
import mongoose, { Schema } from 'mongoose';

const featuredProjectSchema = new Schema<IFeaturedProjectDocument>(
    {
        projectId: String,
        start_date: Date,
        end_date: Date,
        CTA_link: String,
        cause_link: String,
        type: { type: String, enum: Object.values(FeaturedProjectActionType) },
    },
    {
        timestamps: true,
    }
);

const FeaturedProject =
    mongoose.models.FeaturedProject || mongoose.model('FeaturedProject', featuredProjectSchema);

export default FeaturedProject;
