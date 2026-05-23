import Lesson from "../models/LessonModel.js";

/* ================= CREATE LESSON ================= */
export const createLesson = async (req, res) => {
  try {

    const {
      title,
      order,
      book,
      audioUrl,
    } = req.body;

    /* ================= VALIDATION ================= */
    if (
      !title ||
      !order ||
      !book ||
      !audioUrl
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, order, book and audio are required",
      });
    }

    /* ================= CHECK DUPLICATE ================= */
    const existingLesson =
    await Lesson.findOne({
      book,
      order,
    });

    if (existingLesson) {
      return res.status(400).json({
        success: false,
        message:
          `Lesson number ${order} hore ayuu uga jiraa book-kan`,
      });
    }

    /* ================= CREATE LESSON ================= */
    const lesson =
    await Lesson.create({

      title,

      order,

      book,

      audioUrl,

      isActive: true,
    });

    res.status(201).json({
      success: true,
      message:
        "Lesson created successfully",
      lesson,
    });

  } catch (error) {

    console.error(
      "Create Lesson Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

/* ================= GET LESSONS BY BOOK ================= */
export const getLessonsByBook = async (req, res) => {
  try {

    const lessons =
    await Lesson.find({

      book:
      req.params.bookId,

      isActive: true,

    }).sort({
      order: 1,
    });

    res.status(200).json(
      lessons
    );

  } catch (error) {

    console.error(
      "Get Lessons Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

/* ================= UPDATE LESSON ================= */
export const updateLesson = async (req, res) => {
  try {

    const {
      title,
      order,
      audioUrl,
    } = req.body;

    const lesson =
    await Lesson.findById(
      req.params.id
    );

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message:
          "Lesson not found",
      });
    }

    /* ================= CHECK DUPLICATE ================= */
    if (order !== lesson.order) {

      const exists =
      await Lesson.findOne({

        book:
        lesson.book,

        order,

        _id: {
          $ne:
          lesson._id,
        },
      });

      if (exists) {
        return res.status(400).json({
          success: false,
          message:
            `Lesson number ${order} hore ayuu uga jiraa book-kan`,
        });
      }
    }

    /* ================= UPDATE ================= */

    lesson.title =
      title || lesson.title;

    lesson.order =
      order || lesson.order;

    lesson.audioUrl =
      audioUrl || lesson.audioUrl;

    await lesson.save();

    res.status(200).json({
      success: true,
      message:
        "Lesson updated successfully",
      lesson,
    });

  } catch (error) {

    console.error(
      "Update Lesson Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

/* ================= TOGGLE LESSON ================= */
export const toggleLesson = async (req, res) => {
  try {

    const lesson =
    await Lesson.findById(
      req.params.id
    );

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message:
          "Lesson not found",
      });
    }

    lesson.isActive =
      !lesson.isActive;

    await lesson.save();

    res.status(200).json({
      success: true,
      message:
        "Lesson status updated",
      lesson,
    });

  } catch (error) {

    console.error(
      "Toggle Lesson Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

/* ================= DELETE LESSON ================= */
export const deleteLesson = async (req, res) => {
  try {

    const lesson =
    await Lesson.findById(
      req.params.id
    );

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message:
          "Lesson not found",
      });
    }

    await lesson.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Lesson deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete Lesson Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};