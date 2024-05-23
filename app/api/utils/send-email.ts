import { Resend } from 'resend';
import {
    CreateEmailOptions,
    CreateEmailRequestOptions,
    CreateEmailResponse,
} from 'resend/build/src/emails/interfaces';

const resend = new Resend(process.env.RESEND_API_KEY);

interface CustomCreateEmailOptions extends Omit<CreateEmailOptions, 'from'> {
    from?: CreateEmailOptions['from'];
}

export const sendEmail = async (
    payload: CustomCreateEmailOptions,
    options?: CreateEmailRequestOptions
) => {
    const data: CreateEmailResponse = await resend.emails.send(
        {
            ...payload,
            from: 'CATRAFU-SALE <catrafusale@rotaractvisio.com>',
        } as CreateEmailOptions,
        options
    );
};
