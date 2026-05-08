import React, { useState } from "react";

const AudioPlayer = ({ link }) => {
  const [playing, setPlaying] = useState(false);

  if (!link) return null;

  return (
    <div
      style={{
        background: "#FFF8F3",
        borderRadius: "0.8rem",
        padding: "0.8rem",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        width: "100%",
      }}
    >
      <audio
        controls
        src={link}
        style={{ width: "100%" }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div
        style={{
          marginTop: "0.4rem",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: playing ? "green" : "#555",
          textAlign: "center",
        }}
      >
        {playing ? "▶️ Playing..." : "⏸️ Paused"}
      </div>
    </div>
  );
};

export default AudioPlayer;
