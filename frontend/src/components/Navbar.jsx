import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import profileImg from "../assets/sawirprofile.jpeg";
 import "./Navbar .css";const Navbar = () => {
  const [open, setOpen] = useState(false);

  // AUTO HIDE ON SCROLL
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScroll && currentY > 80) setHidden(true);
      else setHidden(false);
      setLastScroll(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header className={`navbar ${hidden ? "hide" : ""}`}>

      {/* TOP GOLD BORDER ACCENT */}
      <div className="nav-top-line" />

      <div className="nav-container">

        {/* LEFT */}
        <div className="nav-left">
          <div className="nav-avatar-ring">
            <img src={profileImg} alt="Profile" className="nav-avatar" />
          </div>
          <div className="nav-brand">

            <Link to="/" className="nav-logo">الشيخ عبد الناصر حاج أحمد
            </Link>

            <span className="nav-tagline">عالم • مُفَسِّر • داعية</span>
          </div>
        </div>

        {/* HAMBURGER */}


        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>


        {/* MENU */}
        <nav className={`nav-menu ${open ? "show" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/kutub" onClick={() => setOpen(false)}>Kutub</NavLink>
          <NavLink to="/tafsiir" onClick={() => setOpen(false)}>Tafsiir</NavLink>
          <NavLink to="/lectures" onClick={() => setOpen(false)}>Muxaadarooyin</NavLink>
          <NavLink to="/favorites" onClick={() => setOpen(false)}>Muxaadoroyin xul ah</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact us</NavLink>
        </nav>
      </div>


      {/* BOTTOM ORNAMENT LINE */}
      <div className="nav-bottom-line" />

    </header>
  );
};

export default Navbar;
