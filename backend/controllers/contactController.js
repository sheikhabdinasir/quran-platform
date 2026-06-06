// controllers/contactController.js

import sendEmail from "../utils/sendEmail.js";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Dhammaan xogta waa loo baahan yahay",
      });
    }

    const emailText = `
Name: ${name}

Email: ${email}

Message:
${message}
`;
console.log("CONTACT EMAIL:", process.env.ADMIN_EMAIL);
 await sendEmail(
  "shcabdinaasir12@gmail.com",
  "New Contact Message",
  emailText
);

    res.json({
      success: true,
      message: "Fariinta waa la diray",
    });
  } catch (error) {
    console.log("Contact Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};