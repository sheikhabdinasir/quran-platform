import { useEffect, useState } from "react";
import axios from "axios";
import { usePublic } from "../Context/PublicContext";
const FavoriteLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [search, setSearch] = useState("");

  const { playLesson } = usePublic();

  useEffect(() => {
    
    axios
  .get(
    `${import.meta.env.VITE_API_URL}/api/lectures/favorites`
  )

      .then((res) => setLectures(res.data.data || []))
      .catch(console.error);
  }, []);

  const filtered = lectures.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.speaker.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="lesson-page">
      <h2 className="page-title"> Muxaadarooyin Xul ah</h2>

      <input
        className="search-input"
        placeholder="🔍 Raadi muxaadaro ama shiikh..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
<style>{`

  *{
    box-sizing:border-box;
  }

  body{
    overflow-x:hidden;
  }

  .lesson-page{

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

  .lesson-page::before{

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

  /* TITLE */

  .page-title{

    text-align:center;

    font-size:clamp(
      1.8rem,
      5vw,
      3rem
    );

    font-weight:900;

    margin-bottom:28px;

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

  /* SEARCH */

  .search-input{

    width:100%;

    max-width:620px;

    margin:0 auto 28px;

    display:block;

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

    color:
    rgba(255,255,255,.42);
  }

  /* LIST */

  .lesson-list{

    max-width:900px;

    margin:auto;

    display:flex;

    flex-direction:column;

    gap:16px;
  }

  /* CARD */

  .lesson-row{

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

  .lesson-row:hover{

    transform:
    translateY(-4px);

    border:
    1px solid rgba(255,215,90,.22);

    box-shadow:
    0 18px 45px rgba(0,0,0,.35);
  }

  /* ICON */

  .lesson-icon{

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

    font-size:1.1rem;

    color:#fff;

    box-shadow:
    0 10px 25px rgba(30,234,114,.22);
  }

  /* INFO */

  .lesson-info{

    flex:1;

    min-width:0;
  }

  .lesson-info h4{

    color:#fff;

    font-size:1rem;

    margin:0 0 5px;

    font-weight:700;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
  }

  .lesson-info p{

    margin:0;

    color:
    rgba(255,255,255,.58);

    font-size:.84rem;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
  }

  /* PLAY */

  .lesson-play{

    min-width:50px;
    height:50px;

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

  /* MOBILE */

  @media(max-width:768px){

    .lesson-page{
      padding:85px 12px 110px;
    }

    .page-title{
      font-size:2rem;
    }

    .lesson-row{
      padding:14px;
      gap:10px;
      border-radius:22px;
    }

    .lesson-icon{
      width:46px;
      height:46px;
      border-radius:15px;
      font-size:1rem;
    }

    .lesson-play{
      min-width:42px;
      height:42px;
      font-size:.9rem;
    }

    .lesson-info h4{
      font-size:.9rem;
    }

    .lesson-info p{
      font-size:.75rem;
    }
  }

  /* SMALL MOBILE */

  @media(max-width:480px){

    .lesson-row{
      padding:12px;
    }

    .page-title{
      font-size:1.7rem;
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

export default FavoriteLectures;
