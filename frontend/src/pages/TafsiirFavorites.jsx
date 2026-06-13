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

      const audios =
      data.tafsiir.filter(
        item =>
        item.mediaType ===
        "audio"
      );

      const onlyFav =
      audios.filter(
        item =>
        favorites.includes(
          item._id
        )
      );

      setItems(
        onlyFav
      );

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
            color:"#fff",
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
                  ? "tafsiir-row active"
                  : "tafsiir-row"
                }
              >

                <button
                  className="tafsiir-play-btn"
                  onClick={() => {

                    if(active){

                      togglePlay();

                    }else{

                      playTrack(
                        item,
                        items
                      );
                    }

                  }}
                >
                  {
                    active &&
                    isPlaying
                    ? "❚❚"
                    : "▶"
                  }
                </button>

              
              <div className="tafsiir-info">

  <h3 dir="rtl">
    {item.surahName}
  </h3>

  <p dir="rtl">
    من الآية {item.ayahFrom} إلى {item.ayahTo}
  </p>

</div>

                <button
                  className="tafsiir-fav"
                  onClick={() =>
                    toggleFavorite(
                      item._id
                    )
                  }
                >
                  ★
                </button>

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