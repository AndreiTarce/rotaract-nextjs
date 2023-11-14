import mongoose, { Schema } from "mongoose";

export interface IFeaturedProject {
    _id: number,
    title: string,
    start_date: Date,
    end_date: Date,
    coverImg: string,
    url: string,
    donation_link: string,
    cause_link: string,
    project_url: string
}
const featuredProjectSchema = new Schema<IFeaturedProject>(
    {
        title: String,
        start_date: Date,
        end_date: Date,
        coverImg: String,
        url: String,
        donation_link: String,
        cause_link: String,
        project_url: String
    },
    {
        timestamps: true,
    }
);

const FeaturedProject = mongoose.models.FeaturedProject || mongoose.model("FeaturedProject", featuredProjectSchema);

export default FeaturedProject;