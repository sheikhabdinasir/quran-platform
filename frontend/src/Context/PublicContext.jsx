// frontend/src/context/PublicContext.jsx

import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const PublicContext = createContext();

/* ================= BACKEND API ================= */
const API =
`${import.meta.env.VITE_API_URL}/api/duruus`;

export const PublicProvider = ({ children }) => {
  /* ================= DATA STATES ================= */
  const [books, setBooks] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= AUDIO CORE ================= */
  const audioRef = useRef(new Audio());

  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  /* ================= PLAYER EXTRA ================= */
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // off | one | all

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  /* ================= BOOKMARKS ================= */
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarkedLessons");
    return saved ? JSON.parse(saved) : [];
  });
  const [lectureFavorites, setLectureFavorites] = useState(() => {
  const saved = localStorage.getItem("lectureFavorites");
  return saved ? JSON.parse(saved) : [];
});

  const currentLesson =
    currentIndex !== null ? playlist[currentIndex] : null;

  /* ================= GET BOOKS ================= */
  const getPublicBooks = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/books`);

      /*
      Backend returns:
      {
        success: true,
        books: [...]
      }
      */

      setBooks(
        (data.books || []).filter(
          (book) => book.isActive !== false
        )
      );
    } catch (error) {
      console.error("Get Public Books Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= GET LESSONS ================= */
  const getPublicLessons = async (bookId) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API}/lessons/${bookId}`
      );

      /*
      show:
      true ✅
      undefined ✅
      false ❌
      */

      setLessons(
        (data || []).filter(
          (lesson) => lesson.isActive !== false
        )
      );
    } catch (error) {
      console.error("Get Public Lessons Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PLAY LESSON ================= */
  const playLesson = (lesson, list = lessons) => {
    if (!lesson?.audioUrl) return;

    setPlaylist(list);

    const index = list.findIndex(
      (item) => item._id === lesson._id
    );

    if (index === -1) return;

    setCurrentIndex(index);

    audioRef.current.src = lesson.audioUrl;
    audioRef.current.play();

    setIsPlaying(true);
  };

  /* ================= TOGGLE PLAY ================= */
  const togglePlay = () => {
    if (!audioRef.current.src) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  /* ================= NEXT ================= */
  const playNext = () => {
    if (!playlist.length) return;

    let nextIndex;

    if (isShuffled) {
      nextIndex = Math.floor(
        Math.random() * playlist.length
      );
    } else {
      nextIndex = currentIndex + 1;

      if (nextIndex >= playlist.length) {
        if (repeatMode === "all") {
          nextIndex = 0;
        } else {
          return;
        }
      }
    }

    setCurrentIndex(nextIndex);

    audioRef.current.src =
      playlist[nextIndex].audioUrl;

    audioRef.current.play();
    setIsPlaying(true);
  };

  /* ================= PREVIOUS ================= */
  const playPrev = () => {
    if (currentIndex === null || currentIndex <= 0) return;

    const prevIndex = currentIndex - 1;

    setCurrentIndex(prevIndex);

    audioRef.current.src =
      playlist[prevIndex].audioUrl;

    audioRef.current.play();
    setIsPlaying(true);
  };

  /* ================= STOP ================= */
  const stopPlayer = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setIsPlaying(false);
    setCurrentIndex(null);
    setPlaylist([]);
  };

  /* ================= SHUFFLE ================= */
  const toggleShuffle = () => {
    setIsShuffled((prev) => !prev);
  };

  /* ================= REPEAT ================= */
  const toggleRepeat = () => {
    setRepeatMode((prev) =>
      prev === "off"
        ? "all"
        : prev === "all"
        ? "one"
        : "off"
    );
  };

  /* ================= BOOKMARK ================= */
  const toggleBookmark = (lesson) => {
    setBookmarks((prev) => {
      const exists = prev.find(
        (item) => item._id === lesson._id
      );

      const updated = exists
        ? prev.filter(
            (item) => item._id !== lesson._id
          )
        : [...prev, lesson];

      localStorage.setItem(
        "bookmarkedLessons",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

 const isBookmarked = (lessonId) =>
  bookmarks.some(
    (lesson) => lesson._id === lessonId
  );

    /* ================= LECTURE FAVORITES ================= */

const toggleLectureFavorite = (lecture) => {

  setLectureFavorites((prev) => {

    const exists = prev.find(
      (item) => item._id === lecture._id
    );

    const updated = exists
      ? prev.filter(
          (item) => item._id !== lecture._id
        )
      : [...prev, lecture];

    localStorage.setItem(
      "lectureFavorites",
      JSON.stringify(updated)
    );

    return updated;

  });

};

const isLectureFavorite = (lectureId) =>
  lectureFavorites.some(
    (lecture) => lecture._id === lectureId
  );

  /* ================= AUDIO EVENTS ================= */
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const onWaiting = () => {
      setIsLoading(true);
    };

    const onPlaying = () => {
      setIsLoading(false);
    };

    const onEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener(
      "timeupdate",
      onTimeUpdate
    );
    audio.addEventListener(
      "waiting",
      onWaiting
    );
    audio.addEventListener(
      "playing",
      onPlaying
    );
    audio.addEventListener(
      "ended",
      onEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        onTimeUpdate
      );
      audio.removeEventListener(
        "waiting",
        onWaiting
      );
      audio.removeEventListener(
        "playing",
        onPlaying
      );
      audio.removeEventListener(
        "ended",
        onEnded
      );
    };
  }, [currentIndex, playlist, repeatMode]);

  /* ================= PROVIDER ================= */
  return (
    <PublicContext.Provider
      value={{
        books,
        lessons,
        loading,

        getPublicBooks,
        getPublicLessons,

        audioRef,
        playlist,
        currentLesson,
        isPlaying,

        playLesson,
        togglePlay,
        playNext,
        playPrev,
        stopPlayer,

        isShuffled,
        repeatMode,
        toggleShuffle,
        toggleRepeat,

        currentTime,
        duration,
        isLoading,

        bookmarks,
toggleBookmark,
isBookmarked,

lectureFavorites,
toggleLectureFavorite,
isLectureFavorite,
      }}
    >
      {children}
    </PublicContext.Provider>
  );
};

export const usePublic = () => useContext(PublicContext);