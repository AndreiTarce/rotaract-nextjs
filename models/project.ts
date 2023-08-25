import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        id: Number,
        title: String,
        description: String,
        img: String,
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;