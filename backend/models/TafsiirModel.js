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
    isDeleted: {
  type: Boolean,
  default: false,
},
  },
  { timestamps: true }
);

const TafsiirModel = mongoose.model("Tafsiir", tafsiirSchema);

export default TafsiirModel;