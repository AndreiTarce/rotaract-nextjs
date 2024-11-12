import { ICatrafusaleRegistrationObject } from '@/components/catrafusale/CatrafusaleRegistrationForm';
import { Schema } from 'mongoose';

export interface ICatrafusaleRegistrationWinter2024 {
    first_name: string;
    last_name: string;
    shop_name: string;
    email: string;
    phone_number: string;
    package: string;
    paid: boolean;
    oneplusone: boolean;
}

export const CatrafusaleRegistrationWinter2024Schema =
    new Schema<ICatrafusaleRegistrationObject>(
        {
            first_name: String,
            last_name: String,
            shop_name: String,
            email: String,
            phone_number: String,
            package: String,
            paid: Boolean,
            checkout_session_id: String,
            oneplusone: Boolean,
        },
        {
            timestamps: true,
        }
    );

// const CatrafusaleRegistration =
//     mongoose.models.CatrafusaleRegistration ||
//     mongoose.model('CatrafusaleRegistration', CatrafusaleRegistrationSchema);

// export default CatrafusaleRegistration;
