import { ROTARACT_VISIO_CONTACT_EMAIL } from '@/lib/constants';
import { ResendEmailService } from '@/services/resendEmailService';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const emailService = new ResendEmailService(resend);

export async function sendContactEmail(subject: string, html: string) {
    return emailService.sendEmail({
        to: [
            'tarceandrei@gmail.com',
            'rotaractvisiocluj@gmail.com',
            'gabrielamusteata28@gmail.com',
            'alexmuresan.dacian@gmail.com',
        ],
        from: ROTARACT_VISIO_CONTACT_EMAIL,
        subject,
        html,
    });
}
