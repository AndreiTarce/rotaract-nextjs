import { ICatrafusaleRegistrationObject } from '@/components/catrafusale/CatrafusaleRegistrationForm'
import mongoose, { Schema } from 'mongoose'

export interface ICatrafusaleRegistration {
    first_name: string
    last_name: string
    shop_name: string
    email: string
    phone_number: string
    package: string
    paid: boolean
}

export const CatrafusaleRegistrationSchema =
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
        },
        {
            timestamps: true,
        }
    )

const CatrafusaleRegistration =
    mongoose.models.CatrafusaleRegistration ||
    mongoose.model('CatrafusaleRegistration', CatrafusaleRegistrationSchema)

export default CatrafusaleRegistration
