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

        <div className="hero-icon">
          ☪️
        </div>

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
          linear-gradient(
            180deg,
            #1A0505 0%,
            #2A0808 30%,
            #120404 70%,
            #050505 100%
          );

          padding:
          110px 16px 140px;

          position:relative;

          overflow:hidden;
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

          background:#7A1D1D;

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
        }

        .hero-icon{

          width:100px;
          height:100px;

          margin:auto;

          border-radius:30px;

          background:
          linear-gradient(
            135deg,
            #D4AF37,
            #FFD95A
          );

          display:flex;

          align-items:center;

          justify-content:center;

          font-size:42px;

          box-shadow:
          0 20px 60px rgba(212,175,55,.35);

          margin-bottom:24px;
        }

        .page-title{

          font-size:clamp(
            2.5rem,
            6vw,
            4.4rem
          );

          font-weight:900;

          line-height:1.1;

          margin-bottom:16px;

          background:
          linear-gradient(
            180deg,
            #FFE082,
            #D4AF37
          );

          -webkit-background-clip:text;

          -webkit-text-fill-color:
          transparent;
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

          padding:18px 24px;

          border-radius:999px;

          background:
          rgba(255,215,90,.06);

          color:#fff;

          font-size:1rem;

          backdrop-filter:blur(16px);

          border:
          1px solid rgba(255,215,90,.12);

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
          rgba(255,215,90,.05);

          border:
          1px solid rgba(255,215,90,.08);

          backdrop-filter:blur(18px);

          padding:20px;

          border-radius:28px;

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
          translateY(-5px);

          border:
          1px solid rgba(212,175,55,.3);

          box-shadow:
          0 20px 40px rgba(0,0,0,.35);
        }

        /* NUMBER */

        .lecture-number{

          min-width:56px;
          height:56px;

          border-radius:20px;

          background:
          rgba(212,175,55,.12);

          color:#FFD54A;

          display:flex;

          align-items:center;

          justify-content:center;

          font-weight:800;
        }

        /* ICON */

        .lecture-icon{

          width:64px;
          height:64px;

          border-radius:22px;

          background:
          linear-gradient(
            135deg,
            #D4AF37,
            #FFD95A
          );

          display:flex;

          align-items:center;

          justify-content:center;

          font-size:1.5rem;

          color:#2C1810;

          box-shadow:
          0 12px 30px rgba(212,175,55,.3);
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

          min-width:58px;
          height:58px;

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

          color:#2C1810;

          font-weight:900;

          font-size:1.15rem;

          box-shadow:
          0 10px 25px rgba(212,175,55,.35);
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