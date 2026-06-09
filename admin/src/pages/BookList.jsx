import {
  useEffect,
  useState,
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useDuruus
} from "../Context/DuruusContext";

import {
  AdminContext
} from "../Context/AdminContext";

import EditBookModal from "../components/EditBookModal";
import EditLessonModal from "../components/EditLessonModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const BookList = () => {

  const navigate =
  useNavigate();

  const { aToken } =
  useContext(AdminContext);

  const {
    books,
    lessons,
    getBooks,
    getLessons,
    deleteBook,
    toggleBook,
    updateBook,
    updateLesson,
    deleteLesson,
    toggleLesson,
  } = useDuruus();

  const [
    selectedBook,
    setSelectedBook
  ] = useState(null);

  const [
    editBook,
    setEditBook
  ] = useState(null);

  const [
    editLesson,
    setEditLesson
  ] = useState(null);

  const [
    deleteBookTarget,
    setDeleteBookTarget
  ] = useState(null);

  const [
    deleteLessonTarget,
    setDeleteLessonTarget
  ] = useState(null);

  const [
    search,
    setSearch
  ] = useState("");

  useEffect(() => {

    getBooks();

  }, []);

  const handleSelectBook =
  (book) => {

    setSelectedBook(book);

    getLessons(book._id);

    setSearch("");
  };

  const filteredLessons =
  lessons.filter((lesson) => {

    const q =
    search.toLowerCase();

    return (

      lesson.title
      .toLowerCase()
      .includes(q)

      ||

      lesson.order
      .toString()
      .includes(q)
    );
  });

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      via-white
      to-emerald-50
      px-4
      sm:px-6
      lg:px-8
      py-6
    "
    >

      {/* HEADER */}
      <div className="mb-6">

        <div
          className="
          bg-white
          border
          border-gray-100
          rounded-2xl
          shadow-md
          p-4
          sm:p-6
        "
        >

          <h2
            className="
            text-2xl
            sm:text-3xl
            font-bold
            text-gray-800
          "
          >
            📚 Kutubta & Casharrada
          </h2>

          <p
            className="
            text-sm
            text-gray-500
            mt-2
          "
          >
            Maamul dhammaan
            kutubta iyo casharrada
          </p>

        </div>

      </div>

      {/* BOOKS */}
      {!selectedBook && (

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-4
        "
        >

          {books.map((book) => (

            <div
              key={book._id}

              className="
              bg-white
              rounded-[18px]
              border
              border-gray-100
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-300
              overflow-hidden
              flex
              flex-col
            "
            >

              {/* IMAGE */}
              <div
                onClick={() =>
                  handleSelectBook(book)
                }

                className="
                cursor-pointer
                overflow-hidden
              "
              >

                <img
                  src={
                    book.image ||

                    "https://via.placeholder.com/400x250?text=No+Image"
                  }

                  alt={book.title}

                  className="
                  w-full
                  h-36
                  sm:h-40
                  object-cover
                  hover:scale-105
                  transition
                  duration-500
                "
                />

              </div>

              {/* CONTENT */}
              <div
                className="
                p-3
                flex
                flex-col
                flex-grow
              "
              >

                <div
                  onClick={() =>
                    handleSelectBook(book)
                  }

                  className="
                  cursor-pointer
                  flex-grow
                "
                >

                  <h3
                    className="
                    text-base
                    font-bold
                    text-gray-800
                    mb-1
                    line-clamp-1
                  "
                  >
                    {book.title}
                  </h3>

                         
                         <p
  className="
  text-xs
  text-gray-600
  mb-1
"
>
  <span
    className="
    font-bold
    text-[#932F2F]
    "
  >
    👳 Sheikh:
  </span>

  <span>
    {" "}
    {book.sheikhName}
  </span>
</p>




                  <p
                    className="
                    text-xs
                    text-gray-500
                    line-clamp-2
                    min-h-[40px]
                  "
                  >
                    {
                      book.description ||

                      "Sharaxaad lama gelin"
                    }
                  </p>

                </div>

                {/* BUTTONS */}
                <div
                  className="
                  mt-3
                  flex
                  flex-wrap
                  gap-2
                "
                >

                  <button
                    onClick={() =>
                      setEditBook(book)
                    }

                    className="
                    px-2.5
                    py-1
                    rounded-md
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    text-[11px]
                    font-medium
                    transition
                  "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      toggleBook(
                        book._id,
                        aToken
                      )
                    }

                    className={`
                    px-2.5
                    py-1
                    rounded-md
                    text-white
                    text-[11px]
                    font-medium
                    transition

                    ${
                      book.isActive

                      ? "bg-emerald-600 hover:bg-emerald-700"

                      : "bg-gray-400 hover:bg-gray-500"
                    }
                  `}
                  >

                    {
                      book.isActive
                      ? "Active"
                      : "Inactive"
                    }

                  </button>

                  <button
                    onClick={() =>
                      setDeleteBookTarget(book)
                    }

                    className="
                    px-2.5
                    py-1
                    rounded-md
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    text-[11px]
                    font-medium
                    transition
                  "
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* LESSONS */}
      {selectedBook && (

        <div
          className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-md
          p-4
          sm:p-6
        "
        >

          {/* BACK */}
          <button
            onClick={() =>
              setSelectedBook(null)
            }

            className="
            mb-5
            px-4
            py-2
            rounded-lg
            bg-gray-100
            hover:bg-gray-200
            text-sm
            font-medium
            transition
          "
          >
            ← Back to Books
          </button>

          {/* HEADER */}
          <div
            className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            mb-4
          "
          >

            <h3
              className="
              text-xl
              sm:text-2xl
              font-bold
              text-gray-800
            "
            >
              🎧 Casharrada – {selectedBook.title}
            </h3>

            <button
              onClick={() =>

                navigate(
                  `/admin/books/${selectedBook._id}/add-lesson`
                )
              }

              className="
              px-4
              py-2
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              text-sm
              font-medium
              transition
            "
            >
              ➕ ku dar cashar
            </button>

          </div>

          {/* SEARCH */}
          <input
            type="text"

            placeholder="
            🔍 Search lesson number ama title...
          "

            value={search}

            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }

            className="
            w-full
            md:w-[400px]
            mb-6
            px-4
            py-3
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            focus:ring-2
            focus:ring-emerald-500
            outline-none
            text-sm
          "
          />

          {/* LESSONS LIST */}
          {filteredLessons.length === 0 ? (

            <div
              className="
              text-center
              py-10
              text-gray-500
            "
            >
              Casharro lama helin
            </div>

          ) : (

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-4
            "
            >

              {filteredLessons.map((lesson) => (

                <div
                  key={lesson._id}

                  className="
                  border
                  border-gray-100
                  rounded-2xl
                  p-4
                  shadow-sm
                  bg-gray-50
                "
                >

                  <div className="mb-3">

                    <p
                      className="
                      text-xs
                      text-gray-500
                    "
                    >
                      Casharka #{lesson.order}
                    </p>

                    <h4
                      className="
                      text-lg
                      font-semibold
                      text-gray-800
                    "
                    >
                      {lesson.title}
                    </h4>

                  </div>

                  {/* AUDIO */}
                  <audio
                    controls
                    src={lesson.audioUrl}
                    className="w-full"
                  />

                  {/* ACTIONS */}
                  <div
                    className="
                    flex
                    flex-wrap
                    gap-2
                    mt-4
                  "
                  >

                    <button
                      onClick={() =>
                        setEditLesson(lesson)
                      }

                      className="
                      px-3
                      py-1
                      rounded-lg
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      text-sm
                    "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        toggleLesson(
                          lesson._id
                        )
                      }

                      className={`
                      px-3
                      py-1
                      rounded-lg
                      text-white
                      text-sm

                      ${
                        lesson.isActive

                        ? "bg-emerald-600"

                        : "bg-gray-400"
                      }
                    `}
                    >

                      {
                        lesson.isActive
                        ? "Active"
                        : "Inactive"
                      }

                    </button>

                    <button
                      onClick={() =>
                        setDeleteLessonTarget(
                          lesson
                        )
                      }

                      className="
                      px-3
                      py-1
                      rounded-lg
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      text-sm
                    "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      )}

      {/* ================= EDIT BOOK MODAL ================= */}

{editBook && (

  <EditBookModal

    book={editBook}

    onClose={() =>
      setEditBook(null)
    }

    onSave={async (id, data) => {

      await updateBook(
        id,
        data,
        aToken
      );

      setEditBook(null);

      getBooks();
    }}
  />
)}

{/* ================= EDIT LESSON MODAL ================= */}

{editLesson && (

  <EditLessonModal

    lesson={editLesson}

    onClose={() =>
      setEditLesson(null)
    }

    onSave={async (id, data) => {

      await updateLesson(
        id,
        data
      );

      await getLessons(
        selectedBook._id
      );

      setEditLesson(null);
    }}
  />
)}

{/* ================= DELETE BOOK ================= */}

{deleteBookTarget && (

  <DeleteConfirmModal

    title="
    Delete Book
    "

    message={`
Ma hubtaa inaad tirtirto "${deleteBookTarget.title}" ?
`}

    onClose={() =>
      setDeleteBookTarget(null)
    }

    onConfirm={async () => {

      await deleteBook(
        deleteBookTarget._id,
        aToken
      );

      setDeleteBookTarget(null);

      getBooks();
    }}
  />
)}

{/* ================= DELETE LESSON ================= */}

{deleteLessonTarget && (

  <DeleteConfirmModal

    title="
    Delete Lesson
    "

    message={`
Ma hubtaa inaad tirtirto "${deleteLessonTarget.title}" ?
`}

    onClose={() =>
      setDeleteLessonTarget(null)
    }

    onConfirm={async () => {

      await deleteLesson(
        deleteLessonTarget._id
      );

      await getLessons(
        selectedBook._id
      );

      setDeleteLessonTarget(null);
    }}
  />
)}

    </div>
  );
};

export default BookList;