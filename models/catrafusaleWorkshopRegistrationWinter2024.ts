import { ICatrafusaleWorkshopRegistrationWinter2024Document } from '@/interfaces/registration/ICatrafusaleRegistration2024Winter';
import mongoose, { Schema } from 'mongoose';

export const CatrafusaleWorkshopRegistrationWinter2024Schema =
    new Schema<ICatrafusaleWorkshopRegistrationWinter2024Document>(
        {
            first_name: String,
            last_name: String,
            email: String,
            phone_number: String,
            package: String,
            checkout_session_id: String,
            payment_confirmed: Boolean,
        },
        {
            timestamps: true,
        }
    );

const CatrafusaleWorkshopRegistrationWinter2024 =
    mongoose.models.CatrafusaleWorkshopRegistrationWinter2024 ||
    mongoose.model(
        'CatrafusaleWorkshopRegistrationWinter2024',
        CatrafusaleWorkshopRegistrationWinter2024Schema
    );

export default CatrafusaleWorkshopRegistrationWinter2024;
