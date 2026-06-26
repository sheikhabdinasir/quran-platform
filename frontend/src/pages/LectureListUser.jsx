import { useEffect, useState } from "react";
import axios from "axios";

import { usePublic } from "../Context/PublicContext";
import { useNavigate } from "react-router-dom";
import "./lecture.css";
const LectureListUser = () => {

  const [lectures, setLectures] = useState([]);
  const [search, setSearch] = useState("");

const {
  playLesson,
  toggleLectureFavorite,
  isLectureFavorite
} = usePublic();  const navigate = useNavigate();

  /* ================= FETCH ================= */

  useEffect(() => {

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/lectures/all`
      )

      .then((res) =>
        setLectures(res.data.data)
      )

      .catch(console.error);

  }, []);

  /* ================= FILTER ================= */

  const filtered = lectures.filter(
    (l) =>

      l.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      l.speaker
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (

    <section className="lecture-page">

      {/* ISLAMIC GLOW */}
     

      {/* TOP */}
      <div className="top-header">

        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          ← Dib u laabo
        </button>

      </div>

      {/* HERO */}
     <div className="lecture-hero">

        <h1 className="page-title">
  Muxaadarooyin
</h1>

        

      </div>

      {/* SEARCH */}
      <div className="search-wrap">

        <input
          className="search-input"

         placeholder="🔍 Raadi magaca muxaadarada..."


          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      {/* STATS */}
      <div className="stats-card">

        <div className="stats-number">
          {filtered.length}
        </div>

        <div className="stats-text">
          Muxaadarooyin
        </div>

      </div> 

      {/* LIST */}
      <div className="lecture-list">
{filtered.map((l, index) => {

  const liked =
    isLectureFavorite(l._id);

  return (
          <div
            key={l._id}

            className="lecture-card"

            onClick={() =>

           playLesson(
  {
    _id: l._id,
    title: l.title,
    audioUrl: l.audioUrl,
  },

  filtered.map((x) => ({
    _id: x._id,
    title: x.title,
    audioUrl: x.audioUrl,
  }))
)
            }
          >

            {/* NUMBER */}
            <div className="lecture-number">

              {
                String(index + 1)
                  .padStart(2, "0")
              }

            </div>

            {/* ICON */}
            <div className="lecture-icon">
              🎧
            </div>

            {/* INFO */}
            <div className="lecture-info">

              <h3>
                {l.title}
              </h3>

              <p>
                {l.speaker}
              </p>

            </div>

            {/* PLAY */}
          <div
  onClick={(e) => {
    e.stopPropagation();

toggleLectureFavorite({
  _id: l._id,
  title: l.title,
  speaker: l.speaker,
  audioUrl: l.audioUrl,
});

console.log("Favorite clicked:", l);

  }}
  className="lecture-favorite"
>
  {liked ? "⭐" : "☆"}   
</div>


<div className="lecture-play">
  ▶
</div>


         </div>

  );

})}
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (

        <div className="empty-state">

          <div className="empty-icon">
            📚☆
          </div>

          <h3>
            Wax muxaadaro ah lama helin
          </h3>

        </div>
      )}

      {/* ================= STYLES ================= */}


    </section>
  );
};

export default LectureListUser;