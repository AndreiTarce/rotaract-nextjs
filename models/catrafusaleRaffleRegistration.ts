import mongoose, { Schema } from 'mongoose';

export interface ICatrafusaleRaffleRegistration {
    name: string;
    email: string;
    phone_number: string;
    tickets: number;
}

export const CatrafusaleRaffleRegistrationSchema =
    new Schema<ICatrafusaleRaffleRegistration>(
        {
            name: String,
            email: String,
            phone_number: String,
            tickets: Number,
        },
        {
            timestamps: true,
        }
    );

const CatrafusaleRaffleRegistration =
    mongoose.models.CatrafusaleRaffleRegistration ||
    mongoose.model(
        'CatrafusaleRaffleRegistration',
        CatrafusaleRaffleRegistrationSchema
    );

export default CatrafusaleRaffleRegistration;
