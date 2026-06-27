
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import { IoBookOutline } from "react-icons/io5";

import {
  TafsiirPlayerContext,
} from "../Context/TafsiirPlayerContext";

import "../styles/playerbar.css";
const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);

  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const TafsiirMiniPlayer = () => {

const navigate = useNavigate();

const location = useLocation();

const [isHidden, setIsHidden] = useState(false);

const {
  currentTrack,
  isPlaying,
  togglePlay,
  nextTrack,
  prevTrack,
  closePlayer,
  currentTime,
  duration,
} = useContext(
  TafsiirPlayerContext
);

  
if (!currentTrack) return null;

if (location.pathname === "/tafsiir/now-playing")
  return null;

if (isHidden) {
  return (
    <div
      className="player-bar minimized"
      onClick={() => setIsHidden(false)}
    >
      ▶ {currentTrack.surahName}
    </div>
  );
}
return (
  <div
    className="player-bar"
    onClick={() => navigate("/tafsiir/now-playing")}
  >

    <button
      className="hide-btn"
      onClick={(e) => {
        e.stopPropagation();
        setIsHidden(true);
      }}
    >
      <FaChevronDown />
    </button>

    <div
      className="player-info"
      onClick={() => navigate("/tafsiir/now-playing")}
    >

      <div className="player-icon">
        <IoBookOutline />
      </div>

      <div className="player-text">

        <h4>{currentTrack.surahName}</h4>

        <p>
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width: `${
                duration
                  ? (currentTime / duration) * 100
                  : 0
              }%`,
            }}
          />

        </div>

      </div>

    </div>

    <div className="controls">

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevTrack();
        }}
      >
        <FaStepBackward />
      </button>

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
          nextTrack();
        }}
      >
        <FaStepForward />
      </button>

      <button
        className="close-btn"
        onClick={(e) => {
          e.stopPropagation();
          closePlayer();
        }}
      >
        <FaTimes />
      </button>

    </div>

  </div>
);
};

export default
TafsiirMiniPlayer;