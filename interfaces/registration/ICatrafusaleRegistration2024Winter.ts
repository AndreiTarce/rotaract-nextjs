import { Document } from 'mongoose';

export interface ICatrafusaleRegistrationWinter2024 {
    first_name: string;
    last_name: string;
    shop_name: string;
    email: string;
    phone_number: string;
    package: string;
    payment_confirmed: boolean;
    oneplusone_promotion: boolean;
    checkout_session_id: string;
}

export interface ICatrafusaleRegistrationWinter2024Limit {
    maxStanders: number;
    currentStanders: number;
    maxTables: number;
    currentTables: number;
}

export interface ICatrafusaleWorkshopRegistrationWinter2024 {
    package: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    payment_confirmed: boolean;
    checkout_session_id: string;
}

export interface ICatrafusaleWorkshopRegistrationWinter2024Limit {
    maxCandles: number;
    currentCandles: number;
    maxGlobes: number;
    currentGlobes: number;
    maxClay: number;
    currentClay: number;
}

export interface ICatrafusaleRegistrationWinter2024Document
    extends ICatrafusaleRegistrationWinter2024,
        Document {}

export interface ICatrafusaleRegistrationWinter2024LimitDocument
    extends ICatrafusaleRegistrationWinter2024Limit,
        Document {}

export interface ICatrafusaleWorkshopRegistrationWinter2024Document
    extends ICatrafusaleWorkshopRegistrationWinter2024,
        Document {}

export interface ICatrafusaleWorkshopRegistrationWinter2024LimitDocument
    extends ICatrafusaleWorkshopRegistrationWinter2024Limit,
        Document {}
