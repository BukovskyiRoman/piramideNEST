export const inviteEmail = async (
  token: string,
  email: string,
  invitePath: string,
) => {
  return {
    to: email, // list of receivers
    from: process.env.EMAIL_ADRESS, // sender address
    subject: 'Invite message', // Subject line
    text: 'welcome', // plaintext body
    html: `<b>Hello, your invite <a href=${invitePath}?token=${token}>there</a></b>`, // HTML body content
  };
};
