import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 2525,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Tafsiir Platform" <shcabdinaasir12@gmail.com>`,
    to,
    subject,
    text,
    html,
  });

  console.log("✅ Email sent:", info.messageId);
};

export default sendEmail;