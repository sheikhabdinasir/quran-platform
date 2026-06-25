import React, {
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

  const [items, setItems] = useState([]);

  const {
    favorites,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    toggleFavorite
  } = useContext(TafsiirPlayerContext);

  useEffect(() => {
    loadData();
  }, [favorites]);

  const loadData = async () => {

    try {

      const { data } = await axios.get(API);

      const onlyFav = data.tafsiir.filter(item =>
        favorites.includes(item._id)
      );

      setItems(onlyFav);

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="tafsiir-page">

      <div className="tafsiir-page-wrap">

        <h1 className="tafsiir-title">
          Tafsiirrada Aan Jeclahay
        </h1>

        <div className="tafsiir-list">

          {
            items.length === 0 && (

              <p
                style={{
                  textAlign: "center",
                  color: "#6B5A4A",
                  marginTop: "40px"
                }}
              >
                Weli maadan dooran Tafsiir.
              </p>

            )
          }

          {

            items.map(item => {

              const active =
                currentTrack?._id === item._id;

              return (

                <div
                  key={item._id}
                  className={
                    active
                      ? "tafsiir-row active"
                      : "tafsiir-row"
                  }
                >

                  {/* ICON */}
                  <div className="tafsiir-icon">
                    🎵
                  </div>

                  {/* INFO */}
                  <div className="tafsiir-info">

                    <h3 dir="rtl">
                      {item.surahName}
                    </h3>

                    <p dir="rtl">
                      من الآية {item.ayahFrom} إلى {item.ayahTo}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="tafsiir-actions">

                    <button
                      className="tafsiir-favorite"
                      onClick={() =>
                        toggleFavorite(item._id)
                      }
                    >
                      ★
                    </button>

                    <button
                      className="tafsiir-play"
                      onClick={() => {

                        if (active) {

                          togglePlay();

                        } else {

                          playTrack(item, items);

                        }

                      }}
                    >
                      {active && isPlaying ? "❚❚" : "▶"}
                    </button>

                  </div>

                </div>

              );

            })

          }

        </div>

      </div>

    </div>

  );

};

export default TafsiirFavorites;