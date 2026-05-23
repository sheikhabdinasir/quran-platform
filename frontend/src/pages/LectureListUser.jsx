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

      {/* ISLAMIC BACKGROUND */}
      <div className="islamic-glow glow1"></div>
      <div className="islamic-glow glow2"></div>

      {/* TOP BAR */}
      <div className="top-header">

        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          ← Dib u laabo
        </button>

      </div>

      {/* HERO */}
      <div className="hero">

        <div className="hero-icon">
          ☪️
        </div>

        <h1 className="page-title">
          Muxaadarooyinka Islaamka
        </h1>

        <p className="hero-subtitle">
          Dhageyso muxaadarooyin
          qalbiga nuurinaya
        </p>

      </div>

      {/* SEARCH */}
      <div className="search-wrap">

        <input
          className="search-input"

          placeholder="
          🔍 Raadi muxaadaro ama shiikh...
        "

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

        {filtered.map((l, index) => (

          <div
            key={l._id}

            className="lecture-card"

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
            <div className="lecture-play">
              ▶
            </div>

          </div>
        ))}

      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (

        <div className="empty-state">

          <div className="empty-icon">
            📚
          </div>

          <h3>
            Wax muxaadaro ah lama helin
          </h3>

        </div>
      )}

      {/* ================= STYLES ================= */}

      <style>{`

        *{
          box-sizing:border-box;
        }

        body{
          overflow-x:hidden;
        }

        .lecture-page{

          min-height:100vh;

          background:
          linear-gradient(
            180deg,
            #06130E 0%,
            #0B1D16 40%,
            #10281D 100%
          );

          padding:
          110px 16px 140px;

          position:relative;

          overflow:hidden;
        }

        /* ISLAMIC GLOW */

        .islamic-glow{

          position:absolute;

          border-radius:50%;

          filter:blur(100px);

          opacity:.18;

          pointer-events:none;
        }

        .glow1{

          width:300px;
          height:300px;

          background:#D4AF37;

          top:-100px;
          right:-100px;
        }

        .glow2{

          width:260px;
          height:260px;

          background:#16A34A;

          bottom:-100px;
          left:-100px;
        }

        /* TOP */

        .top-header{

          max-width:900px;

          margin:auto auto 20px;
        }

        .back-btn{

          background:
          rgba(255,255,255,.08);

          border:
          1px solid rgba(255,255,255,.08);

          color:#F5E6E0;

          padding:10px 16px;

          border-radius:999px;

          cursor:pointer;

          backdrop-filter:blur(12px);

          transition:.25s;
        }

        .back-btn:hover{

          background:
          rgba(255,255,255,.14);
        }

        /* HERO */

        .hero{

          text-align:center;

          max-width:700px;

          margin:auto auto 30px;
        }

        .hero-icon{

          width:90px;
          height:90px;

          margin:auto;

          border-radius:28px;

          background:
          linear-gradient(
            135deg,
            #D4AF37,
            #F5D76E
          );

          display:flex;

          align-items:center;

          justify-content:center;

          font-size:40px;

          box-shadow:
          0 20px 50px rgba(212,175,55,.35);

          margin-bottom:22px;
        }

        .page-title{

          color:#fff;

          font-size:clamp(
            2rem,
            5vw,
            3.2rem
          );

          font-weight:900;

          margin-bottom:12px;

          line-height:1.1;
        }

        .hero-subtitle{

          color:
          rgba(255,255,255,.72);

          font-size:1rem;

          line-height:1.7;
        }

        /* SEARCH */

        .search-wrap{

          max-width:650px;

          margin:auto auto 25px;
        }

        .search-input{

          width:100%;

          border:none;

          outline:none;

          padding:18px 24px;

          border-radius:999px;

          background:
          rgba(255,255,255,.08);

          color:#fff;

          font-size:1rem;

          backdrop-filter:blur(16px);

          border:
          1px solid rgba(255,255,255,.08);

          transition:.25s;
        }

        .search-input::placeholder{
          color:rgba(255,255,255,.45);
        }

        .search-input:focus{

          border:
          1px solid rgba(212,175,55,.45);

          box-shadow:
          0 0 0 4px rgba(212,175,55,.15);
        }

        /* STATS */

        .stats-card{

          width:160px;

          margin:0 auto 30px;

          padding:18px;

          border-radius:24px;

          background:
          rgba(255,255,255,.07);

          backdrop-filter:blur(14px);

          text-align:center;

          border:
          1px solid rgba(255,255,255,.06);
        }

        .stats-number{

          color:#D4AF37;

          font-size:2rem;

          font-weight:900;
        }

        .stats-text{

          color:
          rgba(255,255,255,.7);

          font-size:.9rem;
        }

        /* LIST */

        .lecture-list{

          max-width:900px;

          margin:auto;

          display:flex;

          flex-direction:column;

          gap:18px;
        }

        /* CARD */

        .lecture-card{

          display:flex;

          align-items:center;

          gap:16px;

          background:
          rgba(255,255,255,.07);

          border:
          1px solid rgba(255,255,255,.08);

          backdrop-filter:blur(18px);

          padding:18px;

          border-radius:26px;

          cursor:pointer;

          transition:.3s;

          position:relative;

          overflow:hidden;
        }

        .lecture-card::before{

          content:"";

          position:absolute;

          inset:0;

          background:
          linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.04),
            transparent
          );

          transform:
          translateX(-100%);

          transition:.6s;
        }

        .lecture-card:hover::before{

          transform:
          translateX(100%);
        }

        .lecture-card:hover{

          transform:
          translateY(-4px);

          border:
          1px solid rgba(212,175,55,.3);

          box-shadow:
          0 20px 40px rgba(0,0,0,.25);
        }

        /* NUMBER */

        .lecture-number{

          min-width:52px;
          height:52px;

          border-radius:18px;

          background:
          rgba(212,175,55,.15);

          color:#D4AF37;

          display:flex;

          align-items:center;

          justify-content:center;

          font-weight:800;
        }

        /* ICON */

        .lecture-icon{

          width:58px;
          height:58px;

          border-radius:20px;

          background:
          linear-gradient(
            135deg,
            #16A34A,
            #22C55E
          );

          display:flex;

          align-items:center;

          justify-content:center;

          font-size:1.4rem;

          box-shadow:
          0 12px 30px rgba(34,197,94,.3);
        }

        /* INFO */

        .lecture-info{

          flex:1;

          min-width:0;
        }

        .lecture-info h3{

          color:#fff;

          font-size:1.08rem;

          margin:0 0 6px;

          white-space:nowrap;

          overflow:hidden;

          text-overflow:ellipsis;
        }

        .lecture-info p{

          margin:0;

          color:
          rgba(255,255,255,.6);

          font-size:.92rem;
        }

        /* PLAY */

        .lecture-play{

          min-width:52px;
          height:52px;

          border-radius:50%;

          background:
          linear-gradient(
            135deg,
            #D4AF37,
            #F5D76E
          );

          display:flex;

          align-items:center;

          justify-content:center;

          color:#111;

          font-weight:900;

          font-size:1.1rem;

          box-shadow:
          0 10px 25px rgba(212,175,55,.35);
        }

        /* EMPTY */

        .empty-state{

          text-align:center;

          margin-top:60px;

          color:#fff;
        }

        .empty-icon{

          font-size:4rem;

          margin-bottom:16px;
        }

        /* MOBILE */

        @media(max-width:768px){

          .lecture-card{

            padding:15px;
          }

          .lecture-number{

            min-width:45px;
            height:45px;
          }

          .lecture-icon{

            width:50px;
            height:50px;
          }

          .lecture-play{

            min-width:46px;
            height:46px;
          }
        }

      `}</style>

    </section>
  );
};

export default LectureListUser;