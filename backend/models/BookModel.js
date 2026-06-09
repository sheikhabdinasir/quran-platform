import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    sheikhName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // ✅ Book Cover Image (Cloudinary URL)
    image: {
      type: String,
      default: "",
    },

    // ✅ Active / Inactive Toggle
    isActive: {
      type: Boolean,
      default: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);