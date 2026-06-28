import { useState } from "react";
import { usePublic } from "../Context/PublicContext";
import "./lecture.css";
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
    
<div className="lecture-hero">

  <h1 className="page-title">
    Muxaadarooyin Xul ah
  </h1>

</div>
      <input
        className="search-input"
        placeholder="🔍 Raadi muxaadaro..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="stats-card">
  <div className="stats-number">
    {filtered.length}
  </div>

  <div className="stats-text">
    Muxaadarooyin Lxul ah
  </div>
</div>

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



`}</style>
    </section>
  );
};

export default FavoriteLectures;
