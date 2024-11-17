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

export interface ICatrafusaleRegistrationWinter2024Document
    extends ICatrafusaleRegistrationWinter2024,
        Document {}

export interface ICatrafusaleRegistrationWinter2024LimitDocument
    extends ICatrafusaleRegistrationWinter2024Limit,
        Document {}
