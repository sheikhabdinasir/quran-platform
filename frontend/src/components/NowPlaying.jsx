import { usePublic } from "../Context/PublicContext";
import { useNavigate } from "react-router-dom";
import "../styles/nowplaying.css";

const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const NowPlaying = () => {
  const {
    audioRef,
    currentLesson,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    toggleShuffle,
    toggleRepeat,
    isShuffled,
    repeatMode,
    currentTime,
    duration,
  } = usePublic();

  const navigate = useNavigate();

  if (!currentLesson) {
    return (
      <div className="now-playing">
        <p>Cashar lama darin</p>
      </div>
    );
  }

  /* 📘 COVER IMAGE (lesson → default) */
  const coverImage =
    currentLesson.image || "/images/kutubcover.jpeg";

  return (
    <div className="now-playing">
      {/* BACK */}
     
     <button className="back-btn" onClick={() => navigate(-1)}>
  <FaArrowLeft /> Hoos u laabo
</button>

      {/* COVER (ROTATING) */}
      <div className={`cover-circle ${isPlaying ? "rotating" : ""}`}>
        <img src={coverImage} alt={currentLesson.title} />
      </div>

      {/* LESSON NUMBER */}
      <div className="lesson-number">
        {String(currentLesson.order).padStart(2, "0")}
      </div>

      {/* TITLE */}
      <h2 className="lesson-title">{currentLesson.title}</h2>

      {/* PROGRESS (SEEK WORKING) */}
      <div className="progress-container">
        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
          }}
        />

        <span>{formatTime(duration)}</span>
      </div>

      {/* CONTROLS */}
      <div className="controls">
        <button
          className={isShuffled ? "active" : ""}
          onClick={toggleShuffle}
          title="Shuffle"
        >
        <FaRandom />
        </button>

        <button onClick={playPrev} title="Previous">
         <FaStepBackward />
        </button>

        <button className="play-btn" onClick={togglePlay} title="Play / Pause">
        {isPlaying ? "⏸" : "▶"}
        </button>

        <button onClick={playNext} title="Next">
          <FaStepForward />
        </button>

        <button
          className={repeatMode !== "off" ? "active" : ""}
          onClick={toggleRepeat}
          title="Repeat"
        >
          <FaRedoAlt />
        </button>
      </div>
    </div>
  );
};

export default NowPlaying;
