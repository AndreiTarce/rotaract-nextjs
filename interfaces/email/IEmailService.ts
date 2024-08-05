import { IEmailData } from './IEmailData';

export interface IEmailService {
    sendEmail(emailData: IEmailData): Promise<void>;
}
