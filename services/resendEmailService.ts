import { IEmailData } from '@/interfaces/email/IEmailData';
import { IEmailService } from '@/interfaces/email/IEmailService';
import { Resend } from 'resend';

const contactAudienceId = process.env.RESEND_CONTACT_AUDIENCE_ID as string;

export class ResendEmailService implements IEmailService {
    private resend: Resend;

    constructor(resend: Resend) {
        this.resend = resend;
    }

    async sendEmail(
        emailData: RequireAtLeastOne<IEmailData, 'react' | 'html'>
    ): Promise<void> {
        await this.resend.emails.send(emailData);
    }

    async getContactAudienceEmails(): Promise<string[]> {
        const contactAudience = await this.resend.contacts.list({
            audienceId: contactAudienceId,
        });

        const contactAudienceEmails = contactAudience.data?.data.map(
            (contact) => contact.email
        );

        if (contactAudienceEmails) {
            return contactAudienceEmails;
        }

        return [];
    }
}
