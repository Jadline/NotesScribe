// helpers/sendEmail.js
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

async function sendEmail(options) {
  try {
    // 1️⃣ Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

   
    const mailOptions = {
      from: `"Notes Scribe" <${process.env.EMAIL_USERNAME}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
     
    };

    
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
}

module.exports = sendEmail;
