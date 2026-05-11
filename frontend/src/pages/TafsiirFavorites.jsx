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
  }, []);

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
          ❤️ Favorites
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
لا توجد مفضلات           </p>
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

                  <h3>
                    {
                      item.surahName
                    }
                  </h3>

                  <p>
                    Part {
                      item.partNumber
                    } • {
                      item.sheikhName
                    }
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