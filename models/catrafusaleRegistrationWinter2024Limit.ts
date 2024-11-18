import { ICatrafusaleRegistrationWinter2024LimitDocument } from '@/interfaces/registration/ICatrafusaleRegistration2024Winter';
import mongoose, { Schema } from 'mongoose';

export const CatrafusaleRegistrationWinter2024LimitSchema =
    new Schema<ICatrafusaleRegistrationWinter2024LimitDocument>({
        maxStanders: Number,
        currentStanders: Number,
        maxTables: Number,
        currentTables: Number,
    });

const CatrafusaleRegistrationWinter2024Limit =
    mongoose.models.CatrafusaleRegistrationWinter2024Limit ||
    mongoose.model(
        'CatrafusaleRegistrationWinter2024Limit',
        CatrafusaleRegistrationWinter2024LimitSchema
    );

export default CatrafusaleRegistrationWinter2024Limit;
