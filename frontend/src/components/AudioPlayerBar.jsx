import { useState } from "react";
import { usePublic } from "../Context/PublicContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/playerbar.css";

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRedoAlt,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import { IoBookOutline } from "react-icons/io5";

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
   <div
  className="player-bar"
  onClick={() => navigate("/now-playing")}
>
      {/* HIDE */}
 <button
  className="hide-btn"
  onClick={(e) => {
    e.stopPropagation();
    setIsHidden(true);
  }}
  title="Qari Player"
>
  <FaChevronDown />
</button>

      {/* INFO */}
      <div
        className="player-info"
        onClick={() => navigate("/now-playing")}
      >
<div className="player-icon">
  <IoBookOutline />
</div>

       
       <div className="player-text">
  <h4>{currentLesson.title}</h4>

  <p>
    {formatTime(currentTime)} / {formatTime(duration)}
  </p>

  <div className="progress-track">
    <div
      className="progress-fill"
      style={{
        width: `${
          duration ? (currentTime / duration) * 100 : 0
        }%`,
      }}
    ></div>
  </div>

</div>
      </div>

      {/* CONTROLS */}
      {isLoading ? (
        <div className="skeleton"></div>
      ) : (
        <div className="controls">

<button
  onClick={(e) => {
    e.stopPropagation();
    playPrev();
  }}
>
  <FaStepBackward />
</button>

         {/* Play / Pause */}
<button
  className="player-play"
  onClick={(e) => {
    e.stopPropagation();
    togglePlay();
  }}
>
  {isPlaying ? <FaPause /> : <FaPlay />}
</button>

<button
  onClick={(e) => {
    e.stopPropagation();
    playNext();
  }}
>
  <FaStepForward />
</button>

         
         {/* Repeat */}
<button
  className={repeatMode !== "off" ? "active" : ""}
  onClick={(e) => {
    e.stopPropagation();
    toggleRepeat();
  }}
  title="Repeat"
>
  <FaRedoAlt />
</button>

         
         {/* ❌ CLOSE */}

<button
  className="close-btn"
  onClick={(e) => {
    e.stopPropagation();
    stopPlayer();
  }}
>
  <FaTimes />
</button>

        </div>
      )}
    </div>
  );
};

export default AudioPlayerBar;
