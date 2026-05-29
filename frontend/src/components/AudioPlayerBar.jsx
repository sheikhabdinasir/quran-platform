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
  } = usePublic();

  const navigate = useNavigate();
  const location = useLocation();

  /* 🔽 UI hide / show */
  const [isHidden, setIsHidden] = useState(false);

  /* ❌ Ha muuqan haddii */
  if (!currentLesson) return null;
  if (location.pathname === "/now-playing") return null;

  /* 🔹 MINIMIZED */
  if (isHidden) {
    return (
      <div
        className="player-bar minimized"
        onClick={() => setIsHidden(false)}
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
        onClick={() => setIsHidden(true)}
        title="Qari Player"
      >
        ⬇️
      </button>

      {/* INFO */}
      <div
        className="player-info"
        onClick={() => navigate("/now-playing")}
      >
        <div className="player-icon">📖</div>

        <div className="player-text">
          <h4>{currentLesson.title}</h4>
          <p>
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      {isLoading ? (
        <div className="skeleton"></div>
      ) : (
        <div className="controls">
          <button onClick={playPrev}>⏮</button>

          {/* ▶️ PLAY */}
          <button className="player-play" onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button onClick={playNext}>⏭</button>

          {/* 🔁 REPEAT */}
          <button
            className={repeatMode !== "off" ? "active" : ""}
            onClick={toggleRepeat}
            title="Repeat"
          >
            🔁
          </button>

          {/* ❌ CLOSE */}
         <button className="close-btn" onClick={stopPlayer}>
  ❌ Cancel
</button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayerBar;
