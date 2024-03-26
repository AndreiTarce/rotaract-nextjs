import mongoose, { Schema } from 'mongoose'

export interface IMindMattersRegistration {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    package: string
}

export const MindMattersRegistrationSchema =
    new Schema<IMindMattersRegistration>(
        {
            first_name: String,
            last_name: String,
            email: String,
            phone_number: String,
            package: String,
        },
        {
            timestamps: true,
        }
    )

const MindMattersRegistration =
    mongoose.models.MindMattersRegistration ||
    mongoose.model('MindMattersRegistration', MindMattersRegistrationSchema)

export default MindMattersRegistration
