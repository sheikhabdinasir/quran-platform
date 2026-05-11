import React, {
  createContext,
  useRef,
  useState,
  useEffect
} from "react";

export const
TafsiirPlayerContext =
createContext();

const TafsiirPlayerProvider =
({ children }) => {

  /*********************************
   AUDIO ENGINE
  *********************************/
  const audioRef =
  useRef(
    new Audio()
  );

  /*********************************
   PLAYER STATES
  *********************************/
  const [playlist,
  setPlaylist] =
  useState([]);

  const [currentTrack,
  setCurrentTrack] =
  useState(null);

  const [isPlaying,
  setIsPlaying] =
  useState(false);

  const [currentTime,
  setCurrentTime] =
  useState(0);

  const [duration,
  setDuration] =
  useState(0);

  /*********************************
   FAVORITES
  *********************************/
  const [favorites,
  setFavorites] =
  useState(() => {

    const saved =
    localStorage.getItem(
      "tafsiirFavorites"
    );

    return saved
      ? JSON.parse(saved)
      : [];
  });

  /*********************************
   CONTINUE LISTENING
  *********************************/
  const [lastSession,
  setLastSession] =
  useState(() => {

    const saved =
    localStorage.getItem(
      "tafsiirLastSession"
    );

    return saved
      ? JSON.parse(saved)
      : null;
  });

  /*********************************
   SAVE FAVORITES
  *********************************/
  useEffect(() => {

    localStorage.setItem(
      "tafsiirFavorites",
      JSON.stringify(
        favorites
      )
    );

  }, [favorites]);

  /*********************************
   PLAY TRACK
  *********************************/
  const playTrack =
  (track,list=[]) => {

    if(list.length)
      setPlaylist(list);

    track.audioUrl ||
track.videoUrl ||
track.fileUrll;

    audioRef.current.play();

    setCurrentTrack(track);
    setIsPlaying(true);
  };

  /*********************************
   RESUME SESSION
  *********************************/
  const resumeLastSession =
  () => {

    if(!lastSession)
      return;

    const track =
    lastSession.track;

    const time =
    lastSession.time || 0;

    audioRef.current.src =
    track.audioUrl ||
    track.fileUrl;

    audioRef.current.currentTime =
    time;

    audioRef.current.play();

    setCurrentTrack(track);
    setCurrentTime(time);
    setIsPlaying(true);
  };

  /*********************************
   TOGGLE PLAY
  *********************************/
  const togglePlay =
  () => {

    if(!currentTrack)
      return;

    if(isPlaying){

      audioRef.current.pause();
      setIsPlaying(false);

    }else{

      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  /*********************************
   NEXT TRACK
  *********************************/
  const nextTrack =
  () => {

    if(
      !playlist.length ||
      !currentTrack
    ) return;

    const index =
    playlist.findIndex(
      item =>
      item._id ===
      currentTrack._id
    );

    const next =
    playlist[
      (index + 1)
      % playlist.length
    ];

    playTrack(
      next,
      playlist
    );
  };

  /*********************************
   PREVIOUS TRACK
  *********************************/
  const prevTrack =
  () => {

    if(
      !playlist.length ||
      !currentTrack
    ) return;

    const index =
    playlist.findIndex(
      item =>
      item._id ===
      currentTrack._id
    );

    const prev =
    playlist[
      (
        index - 1 +
        playlist.length
      ) %
      playlist.length
    ];

    playTrack(
      prev,
      playlist
    );
  };

  /*********************************
   SEEK
  *********************************/
  const seekTo =
  (value) => {

    audioRef.current.currentTime =
    value;

    setCurrentTime(value);
  };

  /*********************************
   CLOSE PLAYER
  *********************************/
  const closePlayer =
  () => {

    audioRef.current.pause();

    audioRef.current.currentTime =
    0;

    setCurrentTrack(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  /*********************************
   FAVORITE TOGGLE
  *********************************/
  const toggleFavorite =
  (id) => {

    if(
      favorites.includes(id)
    ){

      setFavorites(
        favorites.filter(
          item =>
          item !== id
        )
      );

    }else{

      setFavorites([
        ...favorites,
        id
      ]);
    }
  };

  /*********************************
   AUDIO EVENTS
  *********************************/
  useEffect(() => {

    const audio =
    audioRef.current;

    const update =
    () => {

      setCurrentTime(
        audio.currentTime
      );

      setDuration(
        audio.duration || 0
      );

      /*****************************
       SAVE CONTINUE LISTENING
      *****************************/
      if(currentTrack){

        const session = {

          track:
          currentTrack,

          time:
          audio.currentTime
        };

        localStorage.setItem(
          "tafsiirLastSession",
          JSON.stringify(
            session
          )
        );

        setLastSession(
          session
        );
      }
    };

    const ended =
    () => nextTrack();

    audio.addEventListener(
      "timeupdate",
      update
    );

    audio.addEventListener(
      "loadedmetadata",
      update
    );

    audio.addEventListener(
      "ended",
      ended
    );

    return () => {

      audio.removeEventListener(
        "timeupdate",
        update
      );

      audio.removeEventListener(
        "loadedmetadata",
        update
      );

      audio.removeEventListener(
        "ended",
        ended
      );
    };

  }, [currentTrack]);

  /*********************************
   PROVIDER
  *********************************/
  return (

    <TafsiirPlayerContext.Provider
      value={{

        /* PLAYER */
        currentTrack,
        isPlaying,
        currentTime,
        duration,

        /* ACTIONS */
        playTrack,
        resumeLastSession,
        togglePlay,
        nextTrack,
        prevTrack,
        seekTo,
        closePlayer,

        /* FAVORITES */
        favorites,
        toggleFavorite,

        /* CONTINUE */
        lastSession

      }}
    >

      {children}

    </TafsiirPlayerContext.Provider>
  );
};

export default
TafsiirPlayerProvider;