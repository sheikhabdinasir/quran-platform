import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  console.log("HOST:", process.env.EMAIL_HOST);
console.log("USER:", process.env.EMAIL_USER);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });

  console.log("✅ Email sent:", info.messageId);
};

export default sendEmail;