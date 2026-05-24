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

  /* ================= LOAD DATA ================= */

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

  /* ================= FILTER + SORT ================= */

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

      /* ✅ SURAH ORDER */
      if (
        a.surahNumber !==
        b.surahNumber
      ) {

        return (
          a.surahNumber -
          b.surahNumber
        );
      }

      /* ✅ PART ORDER */
      return (
        Number(
          a.partNumber || 1
        ) -

        Number(
          b.partNumber || 1
        )
      );
    });

  /* ================= GROUP BY SURAH ================= */

  const grouped = {};

  filtered.forEach(item => {

    const key =
      item.surahNumber;

    if (!grouped[key]) {

      grouped[key] = {

        surahName:
          item.surahName,

        surahNumber:
          item.surahNumber,

        items: [],
      };
    }

    grouped[key]
      .items
      .push(item);
  });

  const groupedSurahs =
    Object.values(grouped);

  return (

    <div className="tafsiir-page">

      <div className="tafsiir-page-wrap">

        {/* ================= TITLE ================= */}

        <h1 className="tafsiir-title">

          مرحبًا بكم في تعلم تفسير القرآن الكريم

        </h1>

        {/* ================= SEARCH ================= */}

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

        {/* ================= LOADING ================= */}

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

        {/* ================= EMPTY ================= */}

        {
          !loading &&
          groupedSurahs.length === 0 && (

            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
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

        {/* ================= GROUPED LIST ================= */}

        <div className="tafsiir-list">

          {
            groupedSurahs.map(
              (surah) => (

                <div
                  key={
                    surah.surahNumber
                  }

                  className="mb-8"
                >

                  {/* ================= SURAH TITLE ================= */}

                  <div
                    style={{
                      background:
                        "linear-gradient(135deg,#0f172a,#1e293b)",

                      color: "#fff",

                      padding:
                        "14px 18px",

                      borderRadius:
                        "16px",

                      marginBottom:
                        "14px",

                      boxShadow:
                        "0 10px 25px rgba(0,0,0,0.15)"
                    }}
                  >

                    <h2
                      dir="rtl"

                      style={{
                        margin: 0,
                        fontSize: "26px",
                        fontWeight: "700"
                      }}
                    >

                      📖 {
                        surah.surahName
                      }

                    </h2>

                  </div>

                  {/* ================= PARTS ================= */}

                  {
                    surah.items.map(
                      (item) => {

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

                            {/* ================= PLAY ================= */}

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

                            {/* ================= INFO ================= */}

                            <div
                              className="tafsiir-info"
                            >

                              <h3 dir="rtl">

                                الجزء {
                                  item.partNumber
                                }

                              </h3>

                              <p dir="rtl">

                                {
                                  item.sheikhName
                                }

                              </p>

                            </div>

                            {/* ================= FAVORITE ================= */}

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
                      }
                    )
                  }

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
};

export default TafsiirAudio;