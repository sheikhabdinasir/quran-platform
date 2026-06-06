import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
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
    from: `"Tafsiir Platform" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });

  console.log("✅ Email sent:", info.messageId);
};

export default sendEmail;