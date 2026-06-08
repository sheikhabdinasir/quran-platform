import Book from "../models/BookModel.js";
import Lesson from "../models/LessonModel.js";

/* ================= CREATE BOOK ================= */
export const createBook = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, sheikhName, description } = req.body;

    if (!title || !sheikhName) {
      return res.status(400).json({
        success: false,
        message: "Title and Sheikh Name are required",
      });
    }

    let imageUrl = "";

if (req.file) {

  imageUrl = req.file.path;
}

    /* ================= CREATE ================= */
    const book = await Book.create({
      title,
      sheikhName,
      description,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    console.error("Create Book Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= GET BOOKS ================= */
export const getBooks = async (req, res) => {
  try {

     const books = await Book.find({
  isDeleted: false,
}).sort({
  createdAt: -1,
});

    res.json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("Get Books Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= UPDATE BOOK ================= */
export const updateBook = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body);
    console.log("UPDATE FILE:", req.file);

    const { title, sheikhName, description } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

   

    let imageUrl = book.image;

if (req.file) {

  imageUrl = req.file.path;
}

    /* ================= UPDATE DATA ================= */
    book.title = title || book.title;
    book.sheikhName = sheikhName || book.sheikhName;
    book.description = description || book.description;
    book.image = imageUrl;

    await book.save();

    res.json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    console.error("Update Book Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= TOGGLE BOOK ================= */
export const toggleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.isActive = !book.isActive;

    await book.save();

    res.json({
      success: true,
      message: "Book status updated",
      book,
    });
  } catch (error) {
    console.error("Toggle Book Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= DELETE BOOK ================= */
export const deleteBook = async (req, res) => {
  try {


      await Lesson.updateMany(
  {
    book: req.params.id,
  },
  {
    isDeleted: true,
  }
);

await Book.findByIdAndUpdate(
  req.params.id,
  {
    isDeleted: true,
  }
);

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete Book Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};