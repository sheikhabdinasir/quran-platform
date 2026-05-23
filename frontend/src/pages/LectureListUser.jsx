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

      {/* ISLAMIC GLOW */}
      <div className="islamic-glow glow1"></div>
      <div className="islamic-glow glow2"></div>

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
      <div className="hero">

        <h1 className="page-title">
          Muxaadarooyinka
          Islaamka
        </h1>

        <p className="hero-subtitle">
          Dhageyso muxaadarooyin
          qalbiga nuurinaya
          oo nafta iftiiminaya
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
          radial-gradient(
            circle at top,
            rgba(18,80,55,.35),
            transparent 30%
          ),

          linear-gradient(
            180deg,
            #03110D 0%,
            #071B15 30%,
            #04100D 70%,
            #020806 100%
          );

          padding:
          110px 16px 140px;

          position:relative;

          overflow:hidden;
        }

        .lecture-page::before{

          content:"";

          position:absolute;

          inset:0;

          background-image:
          radial-gradient(
            rgba(212,175,55,.04) 1px,
            transparent 1px
          );

          background-size:40px 40px;

          opacity:.25;

          pointer-events:none;
        }

        /* GLOW */

        .islamic-glow{

          position:absolute;

          border-radius:50%;

          filter:blur(120px);

          opacity:.18;

          pointer-events:none;
        }

        .glow1{

          width:320px;
          height:320px;

          background:#FFD54A;

          top:-100px;
          right:-100px;
        }

        .glow2{

          width:260px;
          height:260px;

          background:#14543A;

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
          rgba(255,215,90,.08);

          border:
          1px solid rgba(255,215,90,.12);

          color:#F5E6E0;

          padding:10px 16px;

          border-radius:999px;

          cursor:pointer;

          backdrop-filter:blur(12px);

          transition:.25s;
        }

        .back-btn:hover{

          background:
          rgba(255,215,90,.16);
        }

        /* HERO */

        .hero{

          text-align:center;

          max-width:760px;

          margin:auto auto 40px;

          padding:20px 10px;
        }

        .page-title{

          font-size:clamp(
            2.5rem,
            6vw,
            4.8rem
          );

          font-weight:900;

          line-height:1.1;

          margin-bottom:16px;

          color:#fff;

          text-shadow:
          0 10px 40px rgba(255,215,90,.25);
        }

        .hero-subtitle{

          color:
          rgba(255,255,255,.72);

          font-size:1.1rem;

          line-height:1.8;

          max-width:620px;

          margin:auto;
        }

        /* SEARCH */

        .search-wrap{

          max-width:650px;

          margin:auto auto 28px;
        }

        .search-input{

          width:100%;

          border:none;

          outline:none;

          padding:22px 26px;

          border-radius:999px;

          background:
          rgba(18,45,35,.72);

          color:#fff;

          font-size:1rem;

          backdrop-filter:blur(18px);

          border:
          1px solid rgba(255,215,90,.08);

          box-shadow:
          0 10px 30px rgba(0,0,0,.25);
        }

        .search-input::placeholder{
          color:rgba(255,255,255,.45);
        }

        /* STATS */

        .stats-card{

          width:180px;

          margin:0 auto 36px;

          padding:20px;

          border-radius:28px;

          background:
          rgba(255,215,90,.05);

          backdrop-filter:blur(14px);

          text-align:center;

          border:
          1px solid rgba(255,215,90,.08);
        }

        .stats-number{

          color:#FFD54A;

          font-size:2.3rem;

          font-weight:900;
        }

        .stats-text{

          color:
          rgba(255,255,255,.7);

          font-size:.95rem;
        }

        /* LIST */

        .lecture-list{

          max-width:950px;

          margin:auto;

          display:flex;

          flex-direction:column;

          gap:20px;
        }

        /* CARD */

        .lecture-card{

          display:flex;

          align-items:center;

          gap:18px;

          background:
          linear-gradient(
            90deg,
            rgba(18,45,35,.88),
            rgba(20,50,38,.78)
          );

          border:
          1px solid rgba(255,215,90,.08);

          backdrop-filter:blur(20px);

          padding:24px;

          border-radius:30px;

          cursor:pointer;

          transition:.35s;

          position:relative;

          overflow:hidden;

          box-shadow:
          0 15px 40px rgba(0,0,0,.28);
        }

        .lecture-card:hover{

          transform:
          translateY(-6px);

          border:
          1px solid rgba(255,215,90,.28);

          box-shadow:
          0 25px 60px rgba(0,0,0,.45);
        }

        /* NUMBER */

        .lecture-number{

          min-width:58px;
          height:58px;

          border-radius:18px;

          background:
          rgba(255,215,90,.12);

          color:#FFD54A;

          display:flex;

          align-items:center;

          justify-content:center;

          font-weight:900;
        }

        /* ICON */

        .lecture-icon{

          width:68px;
          height:68px;

          border-radius:22px;

          background:
          linear-gradient(
            135deg,
            #19C15F,
            #1EEA72
          );

          display:flex;

          align-items:center;

          justify-content:center;

          font-size:1.5rem;

          color:#fff;

          box-shadow:
          0 15px 35px rgba(30,234,114,.25);
        }

        /* INFO */

        .lecture-info{

          flex:1;

          min-width:0;
        }

        .lecture-info h3{

          color:#fff;

          font-size:1.1rem;

          margin:0 0 6px;

          white-space:nowrap;

          overflow:hidden;

          text-overflow:ellipsis;
        }

        .lecture-info p{

          margin:0;

          color:
          rgba(255,255,255,.62);

          font-size:.93rem;
        }

        /* PLAY */

        .lecture-play{

          min-width:64px;
          height:64px;

          border-radius:50%;

          background:
          linear-gradient(
            135deg,
            #D4AF37,
            #FFD95A
          );

          display:flex;

          align-items:center;

          justify-content:center;

          color:#1A1208;

          font-weight:900;

          font-size:1.2rem;

          box-shadow:
          0 15px 35px rgba(212,175,55,.35);
        }

        /* EMPTY */

        .empty-state{

          text-align:center;

          margin-top:70px;

          color:#fff;
        }

        .empty-icon{

          font-size:4rem;

          margin-bottom:18px;
        }

        /* MOBILE */

        @media(max-width:768px){

          .page-title{
            font-size:3rem;
          }

          .lecture-card{
            padding:16px;
          }

          .lecture-number{
            min-width:46px;
            height:46px;
          }

          .lecture-icon{
            width:54px;
            height:54px;
          }

          .lecture-play{
            min-width:48px;
            height:48px;
          }
        }

      `}</style>

    </section>
  );
};

export default LectureListUser;