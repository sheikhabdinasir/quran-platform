import jwt from "jsonwebtoken";
import crypto from "crypto";
import Admin from "../models/AdminModel.js";
import sendEmail from "../utils/sendEmail.js";

/* ==============================
   ADMIN LOGIN
============================== */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check empty fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // find admin by email
    const admin = await Admin.findOne({ email });

    // email not found
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    // check password
    const isMatch = await admin.matchPassword(password);

    // password incorrect
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // generate token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Admin Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ==============================
   ADMIN PROFILE (Protected)
============================== */
export const adminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.log("Admin Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ==============================
   FORGOT PASSWORD
============================== */
export const forgotAdminPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // check empty
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hash token before saving
    admin.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // expire after 15 minutes
    admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await admin.save();

    // frontend reset link
    const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;

    const message = `
You requested a password reset for Tafsiir Admin Dashboard.

Reset Link:
${resetUrl}

This link will expire in 15 minutes.
If you did not request this, ignore this email.
    `;

    await sendEmail(admin.email, "Admin Password Reset", message);

    res.json({
      success: true,
      message: "Reset link sent successfully. Check your email.",
    });
  } catch (error) {
    console.log("Forgot Password Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ==============================
   RESET PASSWORD
============================== */
export const resetAdminPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    // hash token to compare with DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    admin.password = newPassword;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save();

    res.json({
      success: true,
      message: "Password reset successful. You can login now.",
    });
  } catch (error) {
    console.log("Reset Password Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ==============================
   CHANGE PASSWORD (Admin Logged In)
============================== */
export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await admin.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("Change Password Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
