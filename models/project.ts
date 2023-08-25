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

const Project = mongoose.models.Topic || mongoose.model("Topic", projectSchema);

export default Project;