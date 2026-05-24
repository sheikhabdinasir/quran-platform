import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { usePublic } from "../Context/PublicContext";

const API =
`${import.meta.env.VITE_API_URL}/api/duruus`;

const Lessons = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const {
    playLesson,
    currentLesson,
    toggleBookmark,
    isBookmarked,
  } = usePublic();

  const [book, setBook] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [search, setSearch] = useState("");

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchBookAndLessons();
  }, [bookId]);

  const fetchBookAndLessons = async () => {
    try {
      /* ================= GET BOOK ================= */
      const booksRes = await axios.get(`${API}/books`);

      // backend returns { success, books }
      const allBooks = booksRes.data.books || [];

      const foundBook = allBooks.find(
        (b) => b._id === bookId
      );

      setBook(foundBook);

      /* ================= GET LESSONS ================= */
      const lessonsRes = await axios.get(
        `${API}/lessons/${bookId}`
      );

      // show true + undefined, hide false
      const activeLessons = (lessonsRes.data || []).filter(
        (lesson) => lesson.isActive !== false
      );

      setLessons(activeLessons);
    } catch (error) {
      console.error("Fetch Lessons Error:", error);
    }
  };

  /* ================= SEARCH ================= */
  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      lesson.order.toString().includes(search)
  );

  return (
    <div className="lessons-page">
      {/* BACK */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Dib u laabo
      </button>

      {/* HEADER */}
      {book && (
        <div className="lessons-header">
          <h2> Kusoo dhawoow</h2>
          <h1>{book.title}</h1>
          <p>🎙 {book.sheikhName}</p>
        </div>
      )}

      {/* SEARCH */}
      <input
        className="search"
        type="text"
        placeholder="🔍 Ka raadi cashar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* EMPTY */}
      {filteredLessons.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Wax casharro ah lama helin
        </p>
      ) : (
        <div className="lesson-list">
          {filteredLessons.map((lesson) => {
            const isActive =
              currentLesson?._id === lesson._id;

            return (
              <div
                key={lesson._id}
                className={`lesson-row ${
                  isActive ? "active" : ""
                }`}
                onClick={() =>
                  playLesson(lesson, filteredLessons)
                }
              >
                {/* ICON */}
                <div className="lesson-icon">🎵</div>

                {/* TEXT */}
                <div className="lesson-text">
                  <h4>{lesson.title}</h4>
                  <p>Cashar #{lesson.order}</p>
                </div>

                {/* BOOKMARK */}
                <div
                  className="lesson-bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(lesson);
                  }}
                >
                  {isBookmarked(lesson._id)
                    ? "⭐"
                    : "☆"}
                </div>

                {/* PLAY */}
                <div className="lesson-play">▶</div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .lessons-page {
          max-width: 900px;
          margin: auto;
          padding: 2rem 1rem 5rem;
        }

        .back-btn {
          background: none;
          border: none;
          color: rgb(5, 58, 173);
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 1rem;
        }

        .lessons-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .lessons-header h1 {
          font-size: 2rem;
          color: #46040fb2;
          margin: .3rem 0;
        }

        .search {
          width: 100%;
          padding: .8rem 1rem;
          border-radius: 12px;
          border: 1px solid #ccc;
          margin-bottom: 1.8rem;
        }

        .lesson-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .lesson-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 8px 20px rgba(0,0,0,.06);
          cursor: pointer;
        }

        .lesson-row.active {
          background: #eef6f1;
          border-left: 4px solid #14532d;
        }

        .lesson-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #e0f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lesson-text {
          flex: 1;
        }

        .lesson-text h4 {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
        }

        .lesson-text p {
          margin: 2px 0 0;
          font-size: 13px;
          color: #6b7280;
        }

        .lesson-bookmark,
        .lesson-play {
          font-size: 18px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Lessons;