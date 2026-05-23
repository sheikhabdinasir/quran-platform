import { useEffect, useState } from "react";

import {
  usePublic
} from "../Context/PublicContext";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import "../styles/playerbar.css";

const formatTime = (time) => {

  if (
    !time ||
    isNaN(time)
  ) return "0:00";

  const minutes =
  Math.floor(time / 60);

  const seconds =
  Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const AudioPlayerBar = () => {

  const {

    currentLesson,

    isPlaying,

    togglePlay,

    playNext,

    playPrev,

    toggleRepeat,

    repeatMode,

    currentTime,

    duration,

    isLoading,

    stopPlayer,

  } = usePublic();

  const navigate =
  useNavigate();

  const location =
  useLocation();

  /* 🔽 HIDE PLAYER */
  const [
    isHidden,
    setIsHidden
  ] = useState(false);

  /* ❌ AUDIO ERROR */
  const [
    hasError,
    setHasError
  ] = useState(false);

  /* =========================
     RESET ERROR WHEN SONG CHANGES
  ========================= */

  useEffect(() => {

    setHasError(false);

  }, [currentLesson]);

  /* ❌ HIDE PLAYER */
  if (!currentLesson)
    return null;

  /* ❌ DON'T SHOW IN NOW PLAYING */
  if (
    location.pathname ===
    "/now-playing"
  ) return null;

  /* =========================
     INVALID LINK DETECTION
  ========================= */

  const invalidAudio =

    !isLoading &&

    !duration &&

    currentLesson.audioUrl;

  /* 🔹 MINIMIZED */
  if (isHidden) {

    return (

      <div
        className="
        player-bar
        minimized
      "

        onClick={() =>
          setIsHidden(false)
        }
      >

        ▶️ {currentLesson.title}

      </div>
    );
  }

  return (

    <div className="player-bar">

      {/* HIDE */}
      <button
        className="hide-btn"

        onClick={() =>
          setIsHidden(true)
        }

        title="Qari Player"
      >
        ⬇️
      </button>

      {/* INFO */}
      <div
        className="player-info"

        onClick={() =>

          !hasError &&
          navigate("/now-playing")
        }
      >

        <div className="player-icon">
          📖
        </div>

        <div className="player-text">

          <h4>
            {currentLesson.title}
          </h4>

          {/* ❌ INVALID AUDIO */}
          {invalidAudio || hasError ? (

            <p
              style={{
                color: "#ffb4b4",
              }}
            >
              Audio failed
            </p>

          ) : (

            <p>

              {
                formatTime(currentTime)
              }

              {" / "}

              {
                formatTime(duration)
              }

            </p>

          )}

        </div>

      </div>

      {/* CONTROLS */}
      <div className="controls">

        {/* ❌ INVALID AUDIO */}
        {invalidAudio || hasError ? (

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >

            <span
              style={{
                color: "#ffb4b4",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Invalid Audio
            </span>

            <button
              className="close-btn"

              onClick={stopPlayer}

              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#ef4444",
                color: "#fff",
                fontSize: "18px",
                border: "none",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

          </div>

        ) : isLoading ? (

          <div className="skeleton"></div>

        ) : (

          <>

            <button onClick={playPrev}>
              ⏮
            </button>

            {/* ▶️ PLAY */}
            <button
              className="player-play"

              onClick={togglePlay}
            >
              {
                isPlaying
                ? "⏸"
                : "▶"
              }
            </button>

            <button onClick={playNext}>
              ⏭
            </button>

            {/* 🔁 REPEAT */}
            <button
              className={
                repeatMode !== "off"
                  ? "active"
                  : ""
              }

              onClick={toggleRepeat}

              title="Repeat"
            >
              🔁
            </button>

            {/* ❌ CLOSE */}
            <button
              className="close-btn"

              onClick={stopPlayer}
            >
              ✕
            </button>

          </>

        )}

      </div>

    </div>
  );
};

export default AudioPlayerBar;