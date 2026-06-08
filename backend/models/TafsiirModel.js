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

    mediaType: {
      type: String,
      enum: ["video", "audio"],
      required: true,
    },

    sourceType: {
      type: String,
      enum: ["upload", "link"],
      default: "upload",F
    },

    videoUrl: {
      type: String,
      default: "",
    },

    audioUrl: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 0,
    },

    cloudinaryPublicId: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const TafsiirModel = mongoose.model("Tafsiir", tafsiirSchema);

export default TafsiirModel;