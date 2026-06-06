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

    const html = `
    <div style="
      font-family: Arial, sans-serif;
      max-width:700px;
      margin:auto;
      line-height:1.8;
      background:#ffffff;
      padding:20px;
    ">

      <h2 style="color:#0f172a;">
        📩 Fariin Cusub oo Website-ka ka timid
      </h2>

      <hr>

      <p>
        <strong>👤 Magac:</strong>
        ${name}
      </p>

      <p>
        <strong>📧 Email:</strong>
        <a href="mailto:${email}">
          ${email}
        </a>
      </p>

      <hr>

      <h3>💬 Fariinta:</h3>

      <div style="
        font-size:16px;
        white-space:pre-wrap;
        background:#f8fafc;
        padding:15px;
        border-radius:8px;
        border-left:4px solid #2563eb;
      ">
${message}
      </div>

      <br>

      <hr>

      <p style="color:gray;">
        Fariintan waxaa laga soo diray Contact Us form-ka Tafsiir Platform.
      </p>

    </div>
    `;

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "📩 Fariin Cusub oo Website-ka ka timid",
      emailText,
      html
    );

    res.json({
      success: true,
      message: "Fariintaada waa la diray",
    });

  } catch (error) {
    console.log("Contact Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};