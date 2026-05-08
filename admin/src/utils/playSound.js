let audio = null;

export const playDing = () => {
  if (!audio) {
    // ✅ public folder → direct URL
    audio = new Audio("/sounds/ding.mp3");
    audio.volume = 0.6;
  }

  audio.currentTime = 0;

  audio.play().catch(err => {
    console.log("Audio blocked:", err);
  });
};
