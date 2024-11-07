import { Document } from 'mongoose';

export const flattenObject = <T extends Document>(document: T) =>
    document.toObject({ flattenMaps: true, flattenObjectIds: true });
