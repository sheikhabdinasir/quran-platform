import { useState } from "react";
import { usePublic } from "../Context/PublicContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/playerbar.css";

const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);

  const seconds = Math.floor(time % 60)
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
    audioRef,
  } = usePublic();

  const navigate = useNavigate();
  const location = useLocation();

  const [isHidden, setIsHidden] = useState(false);

  if (!currentLesson) return null;

  if (location.pathname === "/now-playing")
    return null;

  if (isHidden) {
    return (
      <div
        className="player-bar minimized"
        onClick={() => setIsHidden(false)}
      >
        ▶ {currentLesson.title}
      </div>
    );
  }

  return (
    <div className="player-bar">

      {/* TOP */}

      <div className="player-header">

        <button
          className="hide-btn"
          onClick={() => setIsHidden(true)}
        >
          ⬇
        </button>

        <button
          className="close-btn"
          onClick={stopPlayer}
        >
          ✕
        </button>

      </div>

      {/* INFO */}

      <div
        className="player-info"
        onClick={() => navigate("/now-playing")}
      >

        <div className="player-icon">
          🎧
        </div>

        <div className="player-text">

          <h4>{currentLesson.title}</h4>

          <p>
            Audio Lecture
          </p>

        </div>

      </div>

      {/* PROGRESS */}

      <div className="progress-wrapper">

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            audioRef.current.currentTime =
              e.target.value;
          }}
          className="progress-bar"
        />

        <div className="time-row">

          <span>
            {formatTime(currentTime)}
          </span>

          <span>
            {formatTime(duration)}
          </span>

        </div>

      </div>

      {/* CONTROLS */}

      {isLoading ? (
        <div className="skeleton"></div>
      ) : (
        <div className="controls">

          <button onClick={playPrev}>
            ⏮
          </button>

          <button
            className="player-play"
            onClick={togglePlay}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button onClick={playNext}>
            ⏭
          </button>

          <button
            className={
              repeatMode !== "off"
                ? "active"
                : ""
            }
            onClick={toggleRepeat}
          >
            🔁
          </button>

        </div>
      )}

    </div>
  );
};

export default AudioPlayerBar;