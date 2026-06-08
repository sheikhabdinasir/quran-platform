import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    // Magaca Muxaadarrada
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Magaca Shiikhka
    speaker: {
      type: String,
      required: true,
      trim: true,
    },

    // Description
    description: {
      type: String,
      required: true,
    },

    // Link (YouTube / MP3 / Audio)
    audioUrl: {
  type: String,
  required: true,
},

publicId: {
  type: String,
  required: true,
},

    // Active / Inactive
    isActive: {
      type: Boolean,
      default: true,
    },

    // ⭐ Favorite (Admin selects featured lectures)
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
