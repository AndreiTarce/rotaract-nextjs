import { IEmailData } from '@/interfaces/email/IEmailData';
import { IEmailService } from '@/interfaces/email/IEmailService';
import { Resend } from 'resend';

export class ResendEmailService implements IEmailService {
    private resend: Resend;

    constructor(resend: Resend) {
        this.resend = resend;
    }

    async sendEmail(
        emailData: RequireAtLeastOne<IEmailData, 'react' | 'html'>
    ): Promise<void> {
        this.resend.sendEmail(emailData);
    }
}
