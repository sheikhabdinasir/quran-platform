import React, {
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";
import {
  TafsiirPlayerContext
} from "../Context/TafsiirPlayerContext";

const TafsiirMiniPlayer = () => {

  const navigate =
  useNavigate();

  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    closePlayer,
    currentTime,
    duration,
    seekTo
  } = useContext(
    TafsiirPlayerContext
  );

  if(!currentTrack)
    return null;

  return (
    <div className="mini-player">

      {/* CLICK TOP = OPEN FULL PLAYER */}
      <div
        className="mini-top"
        onClick={() =>
          navigate(
            "/tafsiir/now-playing"
          )
        }
      >

        <div className="mini-left">

          <div className="mini-icon">
            🎧
          </div>

          <div>

            <h4>
              {
                currentTrack.surahName
              }
            </h4>

            <p>
              {
                currentTrack.sheikhName
              }
            </p>

          </div>

        </div>

      </div>

      {/* REAL PROGRESS */}
      <input
        type="range"
        className="mini-range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e)=>
          seekTo(
            Number(
              e.target.value
            )
          )
        }
      />

      {/* CONTROLS */}
      <div className="mini-controls">

        <span>
          Playing
        </span>

        <div>

          <button
            onClick={
              prevTrack
            }
          >
            ⏮
          </button>

          <button
            className="main-play"
            onClick={
              togglePlay
            }
          >
            {
              isPlaying
              ? "❚❚"
              : "▶"
            }
          </button>

          <button
            onClick={
              nextTrack
            }
          >
            ⏭
          </button>

          {/* CLOSE PLAYER */}
          <button
            onClick={
              closePlayer
            }
          >
            ✕
          </button>

        </div>

      </div>

    </div>
  );
};

export default
TafsiirMiniPlayer;