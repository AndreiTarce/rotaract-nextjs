import mongoose, { Schema } from "mongoose";

export interface ISection {
    title: string;
    body: string;
}

export interface IProjectPartner {
    name: string,
    logoUrl: string,
    link: string
}

export interface IProject {
    _id: number,
    title: string,
    shortDescription: string,
    description: string,
    thumbnailImg: string,
    coverImg: string,
    images: string[],
    url: string,
    sections: ISection[],
    partners: IProjectPartner[];
}

const SectionSchema = new Schema<ISection>({
    title: { type: String, required: true },
    body: { type: String, required: true }
});

const ProjectPartnerSchema = new Schema<IProjectPartner>({
    name: { type: String },
    logoUrl: { type: String },
    link: { type: String }
})

const projectSchema = new Schema<IProject>(
    {
        title: String,
        shortDescription: String,
        description: String,
        thumbnailImg: String,
        coverImg: String,
        images: [{ type: String }],
        url: String,
        sections: [SectionSchema],
        partners: [ProjectPartnerSchema]
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;