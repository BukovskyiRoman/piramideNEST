import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { inviteEmail } from '../email/invite-email';

@Processor('mail')
export class MailConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process()
  async transcode(job: Job<unknown>) {
    const letter = await inviteEmail(
      //@ts-ignore
      job.data.token,
      //@ts-ignore
      job.data.email,
      //@ts-ignore
      job.data.address,
    );
    await this.mailerService
      .sendMail(letter)
      .then(() => {
        //console.log('Email has been sent')
      })
      .catch((e) => {
        console.error(e.stack);
      });
  }
}
