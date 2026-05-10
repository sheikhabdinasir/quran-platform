import { useEffect, useState } from "react";
import axios from "axios";

import { usePublic } from "../Context/PublicContext";
import { useNavigate } from "react-router-dom";

const LectureListUser = () => {
  const [lectures, setLectures] = useState([]);
  const [search, setSearch] = useState("");

  const { playLesson } = usePublic();
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  useEffect(() => {
    
    axios
  .get(
    `${import.meta.env.VITE_API_URL}/api/lectures/all`
  )

      .then((res) => setLectures(res.data.data))
      .catch(console.error);
  }, []);

  /* ================= FILTER ================= */
  const filtered = lectures.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.speaker.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="lesson-page">
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="back-btn"
      >
        ← Dib u laabo
      </button>

      <h2 className="page-title">🎧 Muxaadarooyinka Islaamka</h2>

      {/* SEARCH */}
      <input
        className="search-input"
        placeholder="🔍 Raadi muxaadaro ama shiikh..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      <div className="lesson-list">
        {filtered.map((l) => (
          <div
            key={l._id}
            className="lesson-row"
            onClick={() =>
              playLesson(
                {
                  _id: l._id,
                  title: l.title,
                  audioUrl: l.link,
                },
                filtered.map((x) => ({
                  _id: x._id,
                  title: x.title,
                  audioUrl: x.link,
                }))
              )
            }
          >
            <div className="lesson-icon">🎧</div>

            <div className="lesson-info">
              <h4>{l.title}</h4>
              <p>{l.speaker}</p>
            </div>

            <div className="lesson-play">▶</div>
          </div>
        ))}
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        /* PAGE */
        .lesson-page {
          max-width: 800px;
          margin: auto;
          padding: 2rem 1rem;

          /* ✅ MUHIIM – NAVBAR HOOSTIISA */
          margin-top: 100px;
        }

        /* BACK BUTTON */
        .back-btn {
          background: none;
          border: none;
          color: #166534;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        .page-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: #2C1810;
        }

        /* SEARCH */
        .search-input {
          width: 100%;
          max-width: 420px;
          margin: 0 auto 1.5rem;
          display: block;
          padding: 12px 18px;
          border-radius: 999px;
          border: 1px solid #ddd;
        }

        /* LIST */
        .lesson-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .lesson-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          padding: 12px 16px;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transition: 0.2s;
        }

        .lesson-row:hover {
          background: #F0FDF4;
        }

        .lesson-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #E0F2FE;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .lesson-info {
          flex: 1;
          overflow: hidden;
        }

        .lesson-info h4 {
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }

        .lesson-info p {
          font-size: 0.85rem;
          opacity: 0.7;
          margin: 0;
        }

        .lesson-play {
          font-size: 1.2rem;
          color: #16A34A;
        }
      `}</style>
    </section>
  );
};

export default LectureListUser;
