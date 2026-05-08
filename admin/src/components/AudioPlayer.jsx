import React from "react";

const AudioPlayer = ({ link }) => {
  return (
    <audio
      controls
      style={{
        width: "100%",
        marginTop: "8px",
        outline: "none",
        borderRadius: "8px",
      }}
    >
      <source src={link} type="audio/mpeg" />
      Browser-kaagu ma taageerayo audio. waa fileka lacture list
    </audio>
  );
};

export default AudioPlayer;
