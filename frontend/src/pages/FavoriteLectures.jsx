import { useState } from "react";
import { usePublic } from "../Context/PublicContext";
const FavoriteLectures = () => {
  const [search, setSearch] = useState("");

const {
  playLesson,
  lectureFavorites
} = usePublic();
 
const lectures = lectureFavorites;
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
        placeholder="🔍 Raadi muxaadaro..."
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

  background:#F8F3ED;

  padding:
  90px 14px 120px;

  position:relative;

  overflow:hidden;
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

    color:#2C1810;
-webkit-text-fill-color:initial; 
    letter-spacing:-1px;

    text-shadow:
    0 10px 35px rgba(255,215,90,.12);
  }

 .search-input{

  width:100%;
  max-width:620px;

  margin:0 auto 28px;
  display:block;

  padding:18px 22px;

  border-radius:999px;

  background:#FFFFFF;

  color:#2C1810;

  border:1px solid #E8D8C8;

  outline:none;

  font-size:.95rem;

  box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.search-input::placeholder{
  color:#9A8876;
}

.search-input:focus{
  border-color:#D4AF37;
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

  background:#FFFFFF;

  border:1px solid #E8D8C8;

  padding:18px;

  border-radius:26px;

  cursor:pointer;

  transition:.3s;

  position:relative;

  overflow:hidden;

box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.lesson-row:hover{

  transform:translateY(-4px);

  border:1px solid #D4AF37;

  box-shadow:0 18px 45px rgba(0,0,0,.12);

}

  /* ICON */

 
  .lesson-icon{

  width:52px;
  height:52px;

  border-radius:18px;

  background:#F5E6E0;

  display:flex;

  align-items:center;

  justify-content:center;

  font-size:1.1rem;

  color:#932F2F;

  box-shadow:0 8px 20px rgba(0,0,0,.08);
}

  /* INFO */

  .lesson-info{

    flex:1;

    min-width:0;
  }

  .lesson-info h4{

color:#2C1810;
    font-size:1rem;

    margin:0 0 5px;

    font-weight:700;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
  }

  .lesson-info p{

    margin:0;

   color:#6B5A4A;

    font-size:.84rem;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
  }

/* PLAY */

.lesson-play{

  width:42px;
  height:42px;

  border-radius:50%;

  background:#932F2F;

  color:#fff;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:1rem;
  font-weight:900;

  cursor:pointer;

  flex-shrink:0;
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
