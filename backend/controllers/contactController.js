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
📩 NEW CONTACT MESSAGE

━━━━━━━━━━━━━━━━━━

👤 Name:
${name}

📧 Email:
${email}

💬 Message:
${message}

━━━━━━━━━━━━━━━━━━

Sent From: Tafsiir Platform
`;

    await sendEmail(
      process.env.ADMIN_EMAIL,
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