import React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNavigation from "./components/BottomNavigation";
import AudioPlayerBar from "./components/AudioPlayerBar";

/* MAIN */
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

/* LECTURES */
import LectureListUser from "./pages/LectureListUser";
import FavoriteLectures from "./pages/FavoriteLectures";

/* DURUUS */
import Kutub from "./pages/kutub.jsx";
import Lessons from "./pages/Lessons";

/* PLAYER */
import NowPlaying from "./components/NowPlaying";

/* TAFSIIR */
import Tafsiir from "./pages/Tafsiir";
import TafsiirAudio from "./pages/TafsiirAudio";
import TafsiirNowPlaying from "./pages/TafsiirNowPlaying";
import TafsiirMiniPlayer from "./components/TafsiirMiniPlayer";
import TafsiirFavorites from "./pages/TafsiirFavorites";

/* 404 */
import NotFound from "./pages/NotFound";

const App = () => {

  const location =
  useLocation();

  const hideFooter =
    location.pathname === "/now-playing" ||
    location.pathname.startsWith("/kutub") ||
    location.pathname === "/lectures" ||
    location.pathname === "/favorites" ||
    location.pathname.startsWith("/tafsiir");

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>

        {/* MAIN */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<ContactUs />}
        />

        {/* LECTURES */}
        <Route
          path="/lectures"
          element={<LectureListUser />}
        />

        <Route
          path="/favorites"
          element={<FavoriteLectures />}
        />

        {/* DURUUS */}
        <Route
          path="/kutub"
          element={<Kutub />}
        />

        <Route
          path="/kutub/:bookId"
          element={<Lessons />}
        />

        {/* OLD PLAYER */}
        <Route
          path="/now-playing"
          element={<NowPlaying />}
        />

        {/* TAFSIIR */}
        <Route
          path="/tafsiir"
          element={<Tafsiir />}
        />

        <Route
          path="/tafsiir/audio"
          element={<TafsiirAudio />}
        />

        <Route
          path="/tafsiir/now-playing"
          element={<TafsiirNowPlaying />}
        />

        <Route
          path="/tafsiir/favorites"
          element={<TafsiirFavorites />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

  {/* MINI PLAYERS */}
<AudioPlayerBar />
<TafsiirMiniPlayer />

{/* BOTTOM NAVIGATION */}
<BottomNavigation />

{/* FOOTER */}
{!hideFooter && <Footer />}
    </>
  );
};

export default App;