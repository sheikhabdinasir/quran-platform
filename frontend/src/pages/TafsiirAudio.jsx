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

  /* LOAD */
  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      try {

        setLoading(true);

        const { data } =
          await axios.get(API);

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

  /* FILTER + SORT */
  const filtered = items

    .filter(item =>

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
    )

    .sort((a, b) => {

      /* SURAH ORDER */
      if (
        a.surahNumber !==
        b.surahNumber
      ) {

        return (
          a.surahNumber -
          b.surahNumber
        );
      }

      /* AYAH ORDER */
      return (
        Number(
          a.ayahFrom || 1
        ) -

        Number(
          b.ayahFrom || 1
        )
      );
    });

  return (

    <div className="tafsiir-page">

      <div className="tafsiir-page-wrap">

        {/* TITLE */}
        <h1 className="tafsiir-title">


ku soo dhawow barashada Tafsiirka quráanka kariimka

        </h1>

        {/* SEARCH */}
        <input
          type="text"

          className="tafsiir-search"

          placeholder="🔍 Raadi magaca suuradda..."

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

              ⏳sug...

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

                  tafsiir lama helin

                </h2>

                <p>

                  Tafsiir lama heli karo hadda
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
    ? "lesson-row active"
    : "lesson-row"
}
                >

                  {/* PLAY */}

                <div className="lesson-icon">
  🎵
</div>

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

                      من الآية {
                        item.ayahFrom
                      }

                      {" "}إلى{" "}

                      {
                        item.ayahTo
                      }

                    </p>

                  </div>

                  {/* FAVORITE */}

                 <div className="lesson-actions">

  <button
    className="lesson-favorite"
    onClick={() => toggleFavorite(item._id)}
  >
    {liked ? "★" : "☆"}
  </button>

  <button
    className="lesson-play"
    onClick={() => {
      if (active) {
        togglePlay();
      } else {
        playTrack(item, filtered);
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

export default TafsiirAudio;