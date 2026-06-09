import mongoose from "mongoose";

const tafsiirSchema = new mongoose.Schema(
  {
    juzNumber: {
      type: Number,
      required: true,
    },

    surahNumber: {
      type: Number,
      required: true,
    },

    surahName: {
      type: String,
      required: true,
      trim: true,
    },

    partNumber: {
      type: Number,
      required: true,
    },

    ayahFrom: {
      type: Number,
      required: true,
    },

    ayahTo: {
      type: Number,
      required: true,
    },

    tafsiirTitle: {
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
    },

    // Audio URL (Cloudinary)
    audioUrl: {
      type: String,
      default: "",
    },

    // Optional thumbnail image
    thumbnail: {
      type: String,
      default: "",
    },

    // Duration in seconds
    duration: {
      type: Number,
      default: 0,
    },

    // Cloudinary Public ID
    cloudinaryPublicId: {
      type: String,
      default: "",
    },

    // Active / Inactive
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const TafsiirModel = mongoose.model(
  "Tafsiir",
  tafsiirSchema
);

export default TafsiirModel;