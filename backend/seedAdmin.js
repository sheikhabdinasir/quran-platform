import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/AdminModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("❌ ADMIN_EMAIL ama ADMIN_PASSWORD kama jiro .env");
      process.exit();
    }

    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const newAdmin = new Admin({
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    await newAdmin.save();

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.log("❌ Seed Error:", error.message);
    process.exit();
  }
};

seedAdmin();
