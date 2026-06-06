import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


const sendEmail = async (to, subject, text, html) => {
  const { data, error } = await resend.emails.send({
    from: "Tafsiir Platform <onboarding@resend.dev>",
    to,
    subject,
    text,
    html,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export default sendEmail;