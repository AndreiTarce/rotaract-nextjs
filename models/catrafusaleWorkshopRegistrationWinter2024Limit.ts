import { ICatrafusaleWorkshopRegistrationWinter2024LimitDocument } from '@/interfaces/registration/ICatrafusaleRegistration2024Winter';
import mongoose, { Schema } from 'mongoose';

export const CatrafusaleWorkshopRegistrationWinter2024LimitSchema =
    new Schema<ICatrafusaleWorkshopRegistrationWinter2024LimitDocument>({
        maxCandles: Number,
        currentCandles: Number,
        maxGlobes: Number,
        currentGlobes: Number,
        maxClay: Number,
        currentClay: Number,
    });

const CatrafusaleWorkshopRegistrationWinter2024Limit =
    mongoose.models.CatrafusaleWorkshopRegistrationWinter2024Limit ||
    mongoose.model(
        'CatrafusaleWorkshopRegistrationWinter2024Limit',
        CatrafusaleWorkshopRegistrationWinter2024LimitSchema
    );

export default CatrafusaleWorkshopRegistrationWinter2024Limit;
