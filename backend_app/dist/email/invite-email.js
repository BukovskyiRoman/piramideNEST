"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteEmail = void 0;
const inviteEmail = async (token, email, invitePath) => {
    return {
        to: email,
        from: process.env.EMAIL_ADRESS,
        subject: 'Invite message',
        text: 'welcome',
        html: `<b>Hello, your invite <a href=${invitePath}?token=${token}>there</a></b>`,
    };
};
exports.inviteEmail = inviteEmail;
//# sourceMappingURL=invite-email.js.map