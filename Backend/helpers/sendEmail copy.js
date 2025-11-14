// helpers/sendEmail.js
const { MailerSend, EmailParams, Recipient, Sender } = require("mailersend");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

async function sendEmail(options) {
  try {
    const sentFrom = new Sender("info@test-z0vklo6pmzpl7qrx.mlsender.net", "Notes Scribe");
    const recipients = [new Recipient(options.email, "User")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(options.subject)
      .setText(options.message);

    const response = await mailerSend.email.send(emailParams);

    console.log("✅ Email sent:", response);
    return response;
  } catch (err) {
    console.error("❌ There was an error sending the email:", err);
    throw err;
  }
}

module.exports = sendEmail;
