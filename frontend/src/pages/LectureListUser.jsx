import { useEffect, useState } from "react";
import axios from "axios";

import { usePublic } from "../Context/PublicContext";
import { useNavigate } from "react-router-dom";

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
      <div className="hero">

        <h1 className="page-title">
          Muxaadarooyinjjghkg
          
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

/* PAGE */

.lecture-page{
  min-height:100vh;
  background:#F8F3ED;
  padding:90px 14px 120px;
  position:relative;
  overflow:hidden;
}

/* TOP */

.top-header{
  max-width:900px;
  margin:auto auto 20px;
}

.back-btn{
  background:#FFFFFF;
  border:1px solid #E8D8C8;
  color:#932F2F;
  padding:10px 16px;
  border-radius:999px;
  cursor:pointer;
  transition:.3s;
}

.back-btn:hover{
  border-color:#D4AF37;
}

/* HERO */

.hero{
  text-align:center;
  max-width:760px;
  margin:auto auto 28px;
}

.page-title{
  font-size:clamp(2rem,5vw,3.4rem);
  font-weight:900;
  color:#2C1810;
  margin-bottom:20px;
}

/* SEARCH */

.search-wrap{
  max-width:620px;
  margin:auto auto 28px;
}

.search-input{
  width:100%;
  padding:18px 22px;
  border-radius:999px;
  background:#FFFFFF;
  border:1px solid #E8D8C8;
  color:#2C1810;
  outline:none;
  font-size:16px;
  box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.search-input::placeholder{
  color:#9A8876;
}

.search-input:focus{
  border-color:#D4AF37;
}

/* STATS */

.stats-card{
  width:150px;
  margin:0 auto 30px;
  padding:16px;
  border-radius:20px;
  background:#FFFFFF;
  border:1px solid #E8D8C8;
  text-align:center;
  box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.stats-number{
  font-size:32px;
  font-weight:900;
  color:#932F2F;
}

.stats-text{
  color:#6B5A4A;
  font-size:14px;
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
  background:#FFFFFF;
  border:1px solid #E8D8C8;
  border-radius:18px;
  padding:16px;
  cursor:pointer;
  transition:.3s ease;
  box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.lecture-card:hover{
  transform:translateY(-4px);
  border-color:#D4AF37;
  box-shadow:0 14px 30px rgba(0,0,0,.12);
}

/* NUMBER */

.lecture-number{
  width:42px;
  height:42px;
  border-radius:12px;
  background:#F5E6E0;
  color:#932F2F;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:800;
  flex-shrink:0;
}

/* ICON */

.lecture-icon{
  width:50px;
  height:50px;
  border-radius:50%;
  background:#F5E6E0;
  color:#932F2F;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
  flex-shrink:0;
}

/* INFO */

.lecture-info{
  flex:1;
}

.lecture-info h3{
  color:#2C1810;
  font-size:17px;
  margin-bottom:5px;
}

.lecture-info p{
  color:#6B5A4A;
  font-size:14px;
}



/* PLAY */

.lecture-play{
  width:42px;
  height:42px;
  border:none;
  border-radius:50%;
  background:#932F2F;
  color:#FFFFFF;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:16px;
  font-weight:900;
  cursor:pointer;
  flex-shrink:0;
}

/* FAVORITE */

.lecture-favorite{
  width:34px;
  height:34px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#932F2F;
  font-size:22px;
  cursor:pointer;
  flex-shrink:0;
  transition:.3s;
}

.lecture-favorite:hover{
  color:#D4AF37;
  transform:scale(1.08);
}

/* EMPTY */

.empty-state{
  text-align:center;
  padding:70px 20px;
  color:#6B5A4A;
}

.empty-icon{
  font-size:60px;
  margin-bottom:16px;
}

.empty-state h3{
  color:#2C1810;
  font-size:24px;
}

/* MOBILE */

@media(max-width:768px){

  .lecture-page{
    padding:85px 12px 110px;
  }

  .page-title{
    font-size:30px;
  }

  .lecture-card{
    padding:14px;
    gap:10px;
    border-radius:16px;
  }

  .lecture-number{
    width:36px;
    height:36px;
    font-size:13px;
  }

  .lecture-icon{
    width:44px;
    height:44px;
    font-size:18px;
  }

  .lecture-info h3{
    font-size:15px;
  }

  .lecture-info p{
    font-size:12px;
  }

  .lecture-play{
    width:38px;
    height:38px;
    font-size:14px;
  }

  .lecture-favorite{
    width:30px;
    height:30px;
    font-size:18px;
  }

  .stats-card{
    width:130px;
    padding:14px;
  }

  .stats-number{
    font-size:26px;
  }

}

@media(max-width:480px){

  .page-title{
    font-size:26px;
  }

  .search-input{
    padding:15px 18px;
    font-size:14px;
  }

  .lecture-card{
    padding:12px;
  }

}

`}</style>

    </section>
  );
};

export default LectureListUser;