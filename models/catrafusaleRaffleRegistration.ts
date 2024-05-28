import mongoose, { Schema } from 'mongoose';

export interface ICatrafusaleRaffleRegistration {
    name: string;
    email: string;
    phone_number: string;
    tickets: number;
    ticket_numbers: TicketNumbers;
}

export interface TicketNumbers {
    start: number;
    end: number;
}

const TicketNumbersSchema = new Schema<TicketNumbers>({
    start: Number,
    end: Number,
});

export const CatrafusaleRaffleRegistrationSchema =
    new Schema<ICatrafusaleRaffleRegistration>(
        {
            name: String,
            email: String,
            phone_number: String,
            tickets: Number,
            ticket_numbers: TicketNumbersSchema,
        },
        {
            timestamps: true,
        }
    );

const CatrafusaleRaffleRegistration =
    mongoose.models.CatrafusaleRaffleRegistration ||
    mongoose.model(
        'CatrafusaleRaffleRegistration',
        CatrafusaleRaffleRegistrationSchema
    );

export default CatrafusaleRaffleRegistration;
