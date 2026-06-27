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
   
   <section className="lesson-page lecture-page">
      <h2 className="page-title"> Muxaadarooyin Xul ah</h2>

      <input
        className="search-input"
        placeholder="🔍 Raadi muxaadaro..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

<div className="lesson-list lecture-list">
      
        {filtered.map((l) => (
          <div
            key={l._id}
          className="lesson-row lecture-card"
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
         <div className="lesson-icon lecture-icon">🎧</div>

           <div className="lesson-info lecture-info">
              <h4>{l.title}</h4>
              <p>{l.speaker}</p>
            </div>
<div className="lesson-play lecture-play">▶</div>
          </div>
        ))}
      </div>
<style>{`
.lesson-page{
  min-height:100vh;
  background:#FFF8F3;
  padding:120px 14px 170px;
}

.page-title{
  text-align:center;
  font-size:clamp(2rem,5vw,3rem);
  color:#2C1810;
  font-weight:900;
  margin-bottom:30px;
}

.search-input{
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

.search-input:focus{
  border-color:#D4AF37;
}

.lesson-list{
  max-width:900px;
  margin:auto;

  display:flex;
  flex-direction:column;
  gap:16px;
}

.lesson-info{
  flex:1;
  min-width:0;
}

.lesson-info h4{
  margin:0;
  color:#2C1810;

  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.lesson-info p{
  margin-top:4px;
  color:#6B5A4A;

  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

@media(max-width:768px){

  .lesson-page{
    padding:120px 14px 170px;
  }

  .lesson-row{
    min-height:84px;
  }

}
`}</style>
    </section>
  );
};

export default FavoriteLectures;
