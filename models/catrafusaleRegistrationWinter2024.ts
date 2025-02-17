import { ICatrafusaleRegistrationWinter2024Document } from '@/interfaces/registration/ICatrafusaleRegistration2024Winter';
import mongoose, { Schema } from 'mongoose';

export const CatrafusaleRegistrationWinter2024Schema =
    new Schema<ICatrafusaleRegistrationWinter2024Document>(
        {
            first_name: String,
            last_name: String,
            shop_name: String,
            email: String,
            phone_number: String,
            package: String,
            payment_confirmed: Boolean,
            checkout_session_id: String,
            oneplusone_promotion: Boolean,
        },
        {
            timestamps: true,
        }
    );

const CatrafusaleRegistrationWinter2024 =
    mongoose.models.CatrafusaleRegistrationWinter2024 ||
    mongoose.model('CatrafusaleRegistrationWinter2024', CatrafusaleRegistrationWinter2024Schema);

export default CatrafusaleRegistrationWinter2024;
