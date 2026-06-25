import React,{
  useContext,
  useEffect,
  useState
} from "react";

import axios from "axios";
import "../tafsiir.css";

import {
  TafsiirPlayerContext
} from "../Context/TafsiirPlayerContext";
const TafsiirFavorites = () => {
const API =
`${import.meta.env.VITE_API_URL}/api/tafsiir/public`;
  const [items,
  setItems] =
  useState([]);

  const {
    favorites,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    toggleFavorite
  } = useContext(
    TafsiirPlayerContext
  );

useEffect(() => {
  loadData();
}, [favorites]);

  const loadData =
  async () => {

    try{

      const { data } =
      await axios.get(API);
const audios = data.tafsiir;

   
      console.log("Favorites:", favorites);

console.log(
  "Audio IDs:",
  audios.map(item => item._id)
);


const onlyFav = audios.filter(
  item =>
    favorites.includes(item._id)
);

console.log("Favorites:", favorites);

console.log(
  "Audio IDs:",
  audios.map(item => item._id)
);

console.log(
  "Only Favorites:",
  onlyFav
);

setItems(onlyFav);

    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="tafsiir-page">

      <div className="tafsiir-page-wrap">

        <h1 className="tafsiir-title">
          xul 
        </h1>

        <div className="tafsiir-list">

          {
          items.length === 0 &&
          <p
         style={{
  color:"#6B5A4A",
  textAlign:"center"
}}
          >
maad samaysan tafsiir xul ah
     </p>
          }

          {items.map(item => {

            const active =
            currentTrack?._id ===
            item._id;

            return (
<div
  key={item._id}
  className={
    active
      ? "lesson-row active"
      : "lesson-row"
  }
>


            <div className="lesson-icon">
  🎵
</div>

              
 <div className="lesson-text">
  <h4 dir="rtl">
    {item.surahName}
  </h4>

  <p dir="rtl">
    Aayadaha {item.ayahFrom} - {item.ayahTo}
  </p>
</div>

    <div
  className="lesson-bookmark"
  onClick={(e) => {
    e.stopPropagation();
    toggleFavorite(item._id);
  }}
>
  ★
</div>

<div
  className="lesson-play"
  onClick={(e) => {
    e.stopPropagation();

    if (active) {
      togglePlay();
    } else {
      playTrack(item, items);
    }
  }}
>
  {active && isPlaying ? "❚❚" : "▶"}
</div>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
};

export default
TafsiirFavorites;