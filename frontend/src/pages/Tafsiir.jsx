import React,{
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "../tafsiir.css";
import {
  TafsiirPlayerContext
} from "../Context/TafsiirPlayerContext";

const Tafsiir = () => {

  const navigate =
  useNavigate();

  const {
    lastSession,
    resumeLastSession
  } = useContext(
    TafsiirPlayerContext
  );

  const formatTime =
  (sec = 0) => {

    const min =
    Math.floor(
      sec / 60
    );

    const seconds =
    Math.floor(
      sec % 60
    );

    return `${min}:${
      String(
        seconds
      ).padStart(
        2,"0"
      )
    }`;
  };

  return (
    <div className="tafsiir-premium-page">

      {/* HERO */}
      <section className="tafsiir-hero">

        <div className="moon-glow"></div>
        <div className="stars"></div>

        <div className="hero-content">

          <p className="hero-small">
            ﷽
          </p>

          <h1 className="hero-title">
دروسُ التفسيرِ للشيخِ عبد الناصر حاجي أحمد          </h1>

          <p className="hero-subtitle">
تعلَّم تفسيرَ القرآنِ الكريمِ          </p>

        </div>

        <div className="mosque-line">
          🕌 🕌 🕌
        </div>

      </section>

      {/* CARDS */}
      <section className="tafsiir-grid">

        {/* AUDIO */}
        <div
          className="premium-islamic-card"
          onClick={() =>
            navigate(
              "/tafsiir/audio"
            )
          }
        >

          <div className="card-icon">
            🎧
          </div>

          <div className="card-body">

            <h2>
التفسير الصوتي            </h2>

            <p>
             استمع إلى دروس التفسير في أي وقت
            </p>

          </div>

          <span className="card-arrow">
            →
          </span>

        </div>

        {/* FAVORITES */}
        <div
          className="premium-islamic-card"
          onClick={() =>
            navigate(
              "/tafsiir/favorites"
            )
          }
        >

          <div className="card-icon">
            ❤️
          </div>

          <div className="card-body">

            <h2>
المفضلة لديّ            </h2>

            <p>
احفظ الدروس التي تحبها            </p>

          </div>

          <span className="card-arrow">
            →
          </span>

        </div>

        {/* CONTINUE */}
        <div
          className="premium-islamic-card"
          onClick={
            resumeLastSession
          }
        >

          <div className="card-icon">
            🕓
          </div>

          <div className="card-body">

            <h2>
تابع الاستماع            </h2>

            <p>

              {
                lastSession
                ? `${lastSession.track.surahName}
                • ${formatTime(
                  lastSession.time
                )}`
                : "Resume last session"
              }

            </p>

          </div>

          <span className="card-arrow">
            →
          </span>

        </div>

      </section>

    </div>
  );
};

export default
Tafsiir;