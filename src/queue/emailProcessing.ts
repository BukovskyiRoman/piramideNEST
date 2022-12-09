import { Process, Processor } from "@nestjs/bull";
import { Job } from 'bull';
import { MailerService } from "@nestjs-modules/mailer";
import { inviteEmail } from "../email/invite-email";

@Processor('mail')
export class MailConsumer {
    constructor(private readonly mailerService: MailerService) {
    }
    @Process()
    async transcode(job: Job<unknown>) {
        //@ts-ignore
        const letter = await inviteEmail(job.data.token, job.data.email)
        await this.mailerService
            .sendMail(letter)
            .then(() => {
                console.log('Email has been sent')
            })
            .catch((e) => {
                console.error(e.stack)
            });
    }
}
