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

const TafsiirAudio = () => {

  const API =
    `${import.meta.env.VITE_API_URL}/api/tafsiir/public`;

  const [items, setItems] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

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

      try {

        setLoading(true);

        const { data } =
          await axios.get(API);

        /* ✅ AUDIO + VIDEO */
        const media =
          data.tafsiir.filter(
            item =>
              item.audioUrl ||
              item.videoUrl
          );

        setItems(media);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  /* ✅ SEARCH */
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

        {/* TITLE */}
        <h1 className="tafsiir-title">
          مرحبًا بكم في تعلم تفسير القرآن الكريم
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          className="tafsiir-search"
          placeholder="ابحث عن السورة أو الشيخ..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        {/* LOADING */}
        {
          loading && (

            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#666"
              }}
            >
              ⏳ جاري التحميل...
            </div>
          )
        }

        {/* LIST */}
        <div className="tafsiir-list">

          {/* EMPTY */}
          {
            !loading &&
            filtered.length === 0 && (

              <div
                style={{
                  textAlign: "center",
                  padding: "50px 20px",
                  width: "100%",
                  color: "#777"
                }}
              >

                <h2
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px"
                  }}
                >
                  لا يوجد تفسير
                </h2>

                <p>
                  لم يتم إضافة أي تفسير حتى الآن
                </p>

              </div>
            )
          }

          {
            filtered.map(item => {

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

                  {/* PLAY */}
                  <button
                    className="tafsiir-play-btn"
                    onClick={() => {

                      if (active) {

                        togglePlay();

                      } else {

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

                  {/* INFO */}
                  <div
                    className="tafsiir-info"
                  >

                    <h3 dir="rtl">

                      {
                        item.surahName
                      }

                    </h3>

                    <p dir="rtl">

                      الجزء {
                        item.partNumber
                      }

                      {" • "}

                      {
                        item.sheikhName
                      }

                    </p>

                  </div>

                  {/* FAVORITE */}
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

            })
          }

        </div>

      </div>

    </div>
  );
};

export default TafsiirAudio;