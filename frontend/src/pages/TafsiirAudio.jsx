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


const TafsiirAudio = () => {

  const API =
  `${import.meta.env.VITE_API_URL}/api/tafsiir/public`;

  const [items,
  setItems] =
  useState([]);

  const [search,
  setSearch] =
  useState("");

  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,

    favorites,
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
    item.audioUrl ||
    item.videoUrl
);

      setItems(audios);

    }catch(err){
      console.log(err);
    }
  };

  const filtered =
  items.filter(item =>

    item.surahName
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    ) ||

    item.sheikhName
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )
  );

  return (
    <div className="tafsiir-page">

      <div className="tafsiir-page-wrap">

        <h1 className="tafsiir-title">
 مرحبًا بكم في تعلم تفسير القرآن الكريم        </h1>

        <input
          type="text"
          className="tafsiir-search"
          placeholder="Search Surah / Sheikh..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
        />

        <div className="tafsiir-list">

          {filtered.map(item => {

            const active =
            currentTrack?._id ===
            item._id;

            const liked =
            favorites.includes(
              item._id
            );

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
                        filtered
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

                <div
                  className="tafsiir-info"
                >

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
                  {
                    liked
                    ? "★"
                    : "☆"
                  }
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
TafsiirAudio;