import mongoose, { Schema } from "mongoose";

export interface IProject {
    _id: number,
    title: string,
    description: string,
    img: string,
    url: string
}

const projectSchema = new Schema<IProject>(
    {
        title: String,
        description: String,
        img: String,
        url: String,
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;