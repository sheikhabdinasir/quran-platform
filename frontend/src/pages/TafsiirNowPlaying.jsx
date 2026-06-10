import React,{
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  TafsiirPlayerContext
} from "../Context/TafsiirPlayerContext";

const TafsiirNowPlaying = () => {

  const navigate =
  useNavigate();

  const {
    currentTrack
  } = useContext(
    TafsiirPlayerContext
  );

  if(!currentTrack)
    return null;

  return (
    <div className="now-page">

      <button
        className="now-back"
        onClick={() =>
          navigate(-1)
        }
      >
        ← Laaboo
      </button>

      <div className="now-cover">
        🕋
      </div>

      <p className="now-small">
        Tafsiir 
      </p>

      <h1 className="now-title">
        {
          currentTrack.surahName
        }
      </h1>

      <p className="now-sheikh">
        {
          currentTrack.sheikhName
        }
      </p>

    </div>
  );
};

export default
TafsiirNowPlaying;