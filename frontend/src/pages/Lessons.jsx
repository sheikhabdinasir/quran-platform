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
    
    <div className="lessons-page lecture-page">
      {/* BACK */}

      <div className="top-header">

  <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Dib u laabo
  </button>

</div>

      {/* HEADER */}

{book && (
  <div className="lessons-header lecture-hero">
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
  className={`lesson-row lecture-card ${
    isActive ? "active" : ""
  }`}
      
                onClick={() =>
                  playLesson(lesson, filteredLessons)
                }
              >
                {/* ICON */}

<div className="lesson-icon lecture-icon">🎧</div>
                {/* TEXT */}
             
             <div className="lesson-text lecture-info">
                  <h4>{lesson.title}</h4>
                  <p>Cashar #{lesson.order}</p>
                </div>

                {/* BOOKMARK */}
             
             <div
  className="lesson-bookmark lecture-favorite"
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
               
               <div className="lesson-play lecture-play">▶</div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`

      
.lessons-page{
  min-height:100vh;
  background:#FFF8F3;
  padding:120px 14px 170px;
}

.lessons-header{
  text-align:center;
  margin-bottom:35px;
}

.lessons-header h2{
  color:#D4AF37;
  font-size:18px;
  margin-bottom:8px;
}

.lessons-header h1{
  font-size:clamp(2rem,5vw,3rem);
  color:#2C1810;
  font-weight:900;
}

.lessons-header p{
  color:#6B5A4A;
}

.search{
  width:100%;
  max-width:650px;
  display:block;
  margin:0 auto 30px;

  padding:18px 22px;

  border-radius:999px;
  border:1px solid #E8D8C8;

  outline:none;
  background:#fff;

  box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.search:focus{
  border-color:#D4AF37;
}

.lesson-list{
  max-width:900px;
  margin:auto;

  display:flex;
  flex-direction:column;
  gap:16px;
}

.lesson-row.active{
  border:1px solid #D4AF37;
}

.lesson-icon{
  flex-shrink:0;
}

.lesson-text{
  flex:1;
  min-width:0;
}

.lesson-text h4{
  margin:0;
  color:#2C1810;
  font-size:16px;

  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.lesson-text p{
  margin-top:4px;
  color:#6B5A4A;

  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.lesson-bookmark{
  cursor:pointer;
}

@media(max-width:768px){

  .lessons-page{
    padding:120px 14px 170px;
  }

  .lesson-row{
    min-height:84px;
  }

}

      `}</style>
    </div>
  );
};

export default Lessons;