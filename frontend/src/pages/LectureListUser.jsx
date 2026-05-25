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
          Muxaadarooyin
          
        </h1>

        

      </div>

      {/* SEARCH */}
      <div className="search-wrap">

        <input
          className="search-input"

          placeholder="
          🔍  Raadi magaca muxaadarada...
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
    90px 14px 120px;

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

    opacity:.15;

    pointer-events:none;
  }

  .glow1{

    width:260px;
    height:260px;

    background:#FFD54A;

    top:-100px;
    right:-100px;
  }

  .glow2{

    width:220px;
    height:220px;

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

    padding:9px 15px;

    border-radius:999px;

    cursor:pointer;

    backdrop-filter:blur(12px);

    transition:.25s;

    font-size:.9rem;
  }

  .back-btn:hover{

    background:
    rgba(255,215,90,.16);
  }

  /* HERO */

  .hero{

    text-align:center;

    max-width:760px;

    margin:auto auto 28px;

    padding:0 10px 10px;
  }

  .page-title{

    font-size:clamp(
      1.9rem,
      5vw,
      3.5rem
    );

    font-weight:900;

    line-height:1.1;

    margin-bottom:14px;

    background:
    linear-gradient(
      135deg,
      #FFF6D6 0%,
      #FFD95A 45%,
      #D4AF37 100%
    );

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    letter-spacing:-1px;

    text-shadow:
    0 10px 35px rgba(255,215,90,.12);
  }

  .hero-subtitle{

    color:
    rgba(255,245,220,.72);

    font-size:.95rem;

    line-height:1.8;

    max-width:560px;

    margin:auto;

    padding:0 10px;
  }

  /* SEARCH */

  .search-wrap{

    max-width:620px;

    margin:auto auto 26px;
  }

  .search-input{

    width:100%;

    border:none;

    outline:none;

    padding:18px 22px;

    border-radius:999px;

    background:
    rgba(18,45,35,.72);

    color:#fff;

    font-size:.95rem;

    backdrop-filter:blur(18px);

    border:
    1px solid rgba(255,215,90,.08);

    box-shadow:
    0 10px 25px rgba(0,0,0,.22);
  }

  .search-input::placeholder{
    color:rgba(255,255,255,.42);
  }

  /* STATS */

  .stats-card{

    width:145px;

    margin:0 auto 30px;

    padding:16px;

    border-radius:24px;

    background:
    rgba(255,215,90,.05);

    backdrop-filter:blur(14px);

    text-align:center;

    border:
    1px solid rgba(255,215,90,.08);
  }

  .stats-number{

    color:#FFD54A;

    font-size:1.8rem;

    font-weight:900;
  }

  .stats-text{

    color:
    rgba(255,255,255,.68);

    font-size:.82rem;
  }

  /* LIST */

  .lecture-list{

    max-width:900px;

    margin:auto;

    display:flex;

    flex-direction:column;

    gap:16px;
  }

  /* CARD */

  .lecture-card{

    display:flex;

    align-items:center;

    gap:14px;

    background:
    linear-gradient(
      90deg,
      rgba(18,45,35,.88),
      rgba(20,50,38,.78)
    );

    border:
    1px solid rgba(255,215,90,.12);

    backdrop-filter:blur(20px);

    padding:18px;

    border-radius:26px;

    cursor:pointer;

    transition:.3s;

    position:relative;

    overflow:hidden;

    box-shadow:
    0 12px 30px rgba(0,0,0,.25);
  }

  .lecture-card:hover{

    transform:
    translateY(-4px);

    border:
    1px solid rgba(255,215,90,.22);

    box-shadow:
    0 18px 45px rgba(0,0,0,.35);
  }

  /* NUMBER */

  .lecture-number{

    min-width:44px;
    height:44px;

    border-radius:14px;

    background:
    rgba(255,215,90,.10);

    color:#FFD54A;

    display:flex;

    align-items:center;

    justify-content:center;

    font-weight:800;

    font-size:.92rem;
  }

  /* ICON */

  .lecture-icon{

    width:52px;
    height:52px;

    border-radius:18px;

    background:
    linear-gradient(
      135deg,
      #19C15F,
      #1EEA72
    );

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:1.15rem;

    color:#fff;

    box-shadow:
    0 10px 25px rgba(30,234,114,.22);
  }

  /* INFO */

  .lecture-info{

    flex:1;

    min-width:0;
  }

  .lecture-info h3{

    color:#fff;

    font-size:1rem;

    margin:0 0 5px;

    font-weight:700;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
  }

  .lecture-info p{

    margin:0;

    color:
    rgba(255,255,255,.58);

    font-size:.84rem;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
  }

  /* PLAY */

  .lecture-play{

    min-width:54px;
    height:54px;

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

    font-size:1rem;

    box-shadow:
    0 12px 28px rgba(212,175,55,.30);
  }

  /* EMPTY */

  .empty-state{

    text-align:center;

    margin-top:60px;

    color:#fff;
  }

  .empty-icon{

    font-size:3rem;

    margin-bottom:14px;
  }

  /* MOBILE */

  @media(max-width:768px){

    .lecture-page{
      padding:85px 12px 110px;
    }

    .page-title{
      font-size:2rem;
    }

    .hero-subtitle{
      font-size:.88rem;
    }

    .lecture-card{
      padding:14px;
      gap:10px;
      border-radius:22px;
    }

    .lecture-number{
      min-width:38px;
      height:38px;
      font-size:.78rem;
    }

    .lecture-icon{
      width:46px;
      height:46px;
      border-radius:15px;
      font-size:1rem;
    }

    .lecture-play{
      min-width:44px;
      height:44px;
      font-size:.9rem;
    }

    .lecture-info h3{
      font-size:.9rem;
    }

    .lecture-info p{
      font-size:.75rem;
    }
  }

  /* SMALL MOBILE */

  @media(max-width:480px){

    .lecture-card{
      padding:12px;
    }

    .page-title{
      font-size:1.7rem;
    }

    .hero-subtitle{
      font-size:.82rem;
      line-height:1.7;
    }

    .search-input{
      padding:15px 18px;
      font-size:.88rem;
    }
  }

`}</style>

    </section>
  );
};

export default LectureListUser;