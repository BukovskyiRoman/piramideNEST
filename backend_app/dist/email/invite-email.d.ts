export declare const inviteEmail: (token: string, email: string, invitePath: string) => Promise<{
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}>;
