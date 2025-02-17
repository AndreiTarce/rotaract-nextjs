import mongoose, { Schema } from 'mongoose';

export interface ICause {
    _id?: number;
    title: string;
    description: string;
    images: string[];
    downloadUrl: string;
}

const causeSchema = new Schema<ICause>(
    {
        title: String,
        description: String,
        images: [{ type: String }],
        downloadUrl: String,
    },
    {
        timestamps: true,
    }
);

const Cause = mongoose.models.Cause || mongoose.model('Cause', causeSchema);

export default Cause;
