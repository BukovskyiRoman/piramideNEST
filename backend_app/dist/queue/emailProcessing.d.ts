import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
export declare class MailConsumer {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    transcode(job: Job): Promise<void>;
}
