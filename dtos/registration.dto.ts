import {
    ICatrafusaleRegistrationWinter2024,
    ICatrafusaleRegistrationWinter2024Document,
    ICatrafusaleRegistrationWinter2024Limit,
    ICatrafusaleRegistrationWinter2024LimitDocument,
    ICatrafusaleWorkshopRegistrationWinter2024,
    ICatrafusaleWorkshopRegistrationWinter2024Document,
    ICatrafusaleWorkshopRegistrationWinter2024Limit,
    ICatrafusaleWorkshopRegistrationWinter2024LimitDocument,
} from '@/interfaces/registration/ICatrafusaleRegistration2024Winter';
import { flattenObject } from './utils';

export interface CatrafusaleRegistrationWinter2024Dto extends ICatrafusaleRegistrationWinter2024 {
    id: string;
}

export interface CatrafusaleRegistrationWinter2024LimitDto
    extends ICatrafusaleRegistrationWinter2024Limit {
    id: string;
}

export interface CatrafusaleWorkshopRegistrationWinter2024Dto
    extends ICatrafusaleWorkshopRegistrationWinter2024 {
    id: string;
}

export interface CatrafusaleWorkshopRegistrationWinter2024LimitDto
    extends ICatrafusaleWorkshopRegistrationWinter2024Limit {
    id: string;
}

export function toCatrafusaleRegistrationWinter2024Dto(
    registration: ICatrafusaleRegistrationWinter2024Document
): CatrafusaleRegistrationWinter2024Dto {
    const registrationObject = flattenObject(registration);

    return {
        id: registrationObject._id,
        checkout_session_id: registrationObject.checkout_session_id,
        first_name: registrationObject.first_name,
        last_name: registrationObject.last_name,
        email: registrationObject.email,
        phone_number: registrationObject.phone_number,
        package: registrationObject.package,
        shop_name: registrationObject.shop_name,
        oneplusone_promotion: registrationObject.oneplusone_promotion,
        payment_confirmed: registrationObject.payment_confirmed,
    };
}

export function toCatrafusaleRegistrationWinter2024LimitDto(
    registrationLimit: ICatrafusaleRegistrationWinter2024LimitDocument
): CatrafusaleRegistrationWinter2024LimitDto {
    const registrationLimitObject = flattenObject(registrationLimit);

    return {
        id: registrationLimitObject._id,
        currentStanders: registrationLimitObject.currentStanders,
        maxStanders: registrationLimitObject.maxStanders,
        maxTables: registrationLimitObject.maxTables,
        currentTables: registrationLimitObject.currentTables,
    };
}

export function toCatrafusaleWorkshopRegistrationWinter2024Dto(
    registration: ICatrafusaleWorkshopRegistrationWinter2024Document
): CatrafusaleWorkshopRegistrationWinter2024Dto {
    const registrationObject = flattenObject(registration);

    return {
        id: registrationObject._id,
        first_name: registrationObject.first_name,
        last_name: registrationObject.last_name,
        email: registrationObject.email,
        phone_number: registrationObject.phone_number,
        package: registrationObject.package,
        payment_confirmed: registrationObject.payment_confirmed,
        checkout_session_id: registrationObject.checkout_session_id,
    };
}

export function toCatrafusaleWorkshopRegistrationWinter2024LimitDto(
    registrationLimit: ICatrafusaleWorkshopRegistrationWinter2024LimitDocument
): CatrafusaleWorkshopRegistrationWinter2024LimitDto {
    const registrationLimitObject = flattenObject(registrationLimit);

    return {
        id: registrationLimitObject._id,
        maxCandles: registrationLimitObject.maxCandles,
        maxGlobes: registrationLimitObject.maxGlobes,
        maxClay: registrationLimitObject.maxClay,
        currentCandles: registrationLimitObject.currentCandles,
        currentGlobes: registrationLimitObject.currentGlobes,
        currentClay: registrationLimitObject.currentClay,
    };
}
