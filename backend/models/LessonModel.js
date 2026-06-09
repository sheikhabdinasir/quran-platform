import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
      
    },
    publicId: {
  type: String,
  default: "",
},

    order: {
      type: Number,
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },


  },
  { timestamps: true }
);

// ✅ HAL ORDER = HAL BOOK
lessonSchema.index({ book: 1, order: 1 }, { unique: true });

export default mongoose.model("Lesson", lessonSchema);
