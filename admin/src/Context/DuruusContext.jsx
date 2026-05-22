import { createContext, useContext, useState } from "react";
import axios from "axios";

const DuruusContext = createContext();
const API =
`${import.meta.env.VITE_API_URL}/api/duruus`;
export const DuruusProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [lessons, setLessons] = useState([]);

  /* ================= BOOKS ================= */

  // GET ALL BOOKS
  const getBooks = async () => {
    try {
      
      const { data } = await axios.get(`${API}/books`);

      // backend now returns:
      // { success: true, books }
      setBooks(data.books || []);
    } catch (error) {
      console.error("Get Books Error:", error);
    }
  };

  // ADD BOOK (with image upload)

  
  const addBook = async (formData, token) => {
  try {
    await axios.post(`${API}/books`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await getBooks();
  } catch (error) {
    console.error("Add Book Error:", error);
    throw error;
  }
};

  // UPDATE BOOK
  const updateBook = async (id, updatedData, token) => {
    try {
      await axios.put(`${API}/books/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getBooks();
    } catch (error) {
      console.error("Update Book Error:", error);
    }
  };

  // TOGGLE ACTIVE / INACTIVE
  const toggleBook = async (id, token) => {
    try {
      await axios.patch(
        `${API}/books/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getBooks();
    } catch (error) {
      console.error("Toggle Book Error:", error);
    }
  };

  // DELETE BOOK
  const deleteBook = async (id, token) => {
    try {
      await axios.delete(`${API}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getBooks();
    } catch (error) {
      console.error("Delete Book Error:", error);
    }
  };

  /* ================= LESSONS ================= */

  const getLessons = async (bookId) => {
    try {
      const { data } = await axios.get(`${API}/lessons/${bookId}`);
      setLessons(data);
    } catch (error) {
      console.error("Get Lessons Error:", error);
    }
  };

  const addLesson = async (lessonData) => {
  try {

    await axios.post(

      `${API}/lessons`,

      lessonData,

      {
        headers: {
          "Content-Type":
          "multipart/form-data",
        },
      }
    );

  } catch (error) {

    console.error(
      "Add Lesson Error:",
      error
    );

    throw error;
  }
};

const updateLesson = async (id, updatedData) => {
  try {

    await axios.put(

      `${API}/lessons/${id}`,

      updatedData,

      {
        headers: {
          "Content-Type":
          "multipart/form-data",
        },
      }
    );

  } catch (error) {

    console.error(
      "Update Lesson Error:",
      error
    );
  }
};

const toggleLesson = async (id) => {
  try {

    await axios.patch(
      `${API}/lessons/${id}/toggle`
    );

  } catch (error) {

    console.error(
      "Toggle Lesson Error:",
      error
    );
  }
};

const deleteLesson = async (id) => {
  try {

    await axios.delete(
      `${API}/lessons/${id}`
    );

  } catch (error) {

    console.error(
      "Delete Lesson Error:",
      error
    );
  }
};

  return (
    <DuruusContext.Provider
      value={{
        /* BOOKS */
        books,
        getBooks,
        addBook,
        updateBook,
        toggleBook,
        deleteBook,

        /* LESSONS */
        lessons,
        getLessons,
        addLesson,
        updateLesson,
        toggleLesson,
        deleteLesson,
      }}
    >
      {children}
    </DuruusContext.Provider>
  );
};

export const useDuruus = () => useContext(DuruusContext);