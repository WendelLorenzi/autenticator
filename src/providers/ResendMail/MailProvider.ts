import { Resend } from 'resend';
import { IMailProvider, IMessage } from './IMailProvider';

export class ResendMailProvider implements IMailProvider {
    private transporter: Resend;
    
    constructor() {
        this.transporter = new Resend(`${process.env.RESEND_API_KEY}`);
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.emails.send({
            from: `${process.env.MAIL_DOMAIN}`,
            to: message.email,
            subject: message.subject,
            html: message.body,
        });
        console.log('email enviado');
    }
}