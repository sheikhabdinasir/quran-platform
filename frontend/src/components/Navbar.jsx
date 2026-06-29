import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import profileImg from "../assets/sawirprofile.jpeg";



import {
  FiHome,
  FiBook,
  FiMail,
  FiInfo,
} from "react-icons/fi";

import {
  MdHeadphones,
  MdFavoriteBorder,
  MdMenuBook,
} from "react-icons/md";

import "../Navbar.css"; 
 const Navbar = () => {
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


  useEffect(() => {
  if (open) {
    document.body.classList.add("menu-open");
  } else {
    document.body.classList.remove("menu-open");
  }

  return () => {
    document.body.classList.remove("menu-open");
  };
}, [open]);

  return (

<>


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
  className={`hamburger ${open ? "active hide-btn" : ""}`}
  onClick={() => setOpen(!open)}
  aria-label="Toggle menu"
>
          <span />
          <span />
          <span />
        </button>


        {/* MENU */}
        </div> {/* nav-container */}
 
<div
  className={`drawer-wrapper ${open ? "show" : ""}`}
  onClick={() => setOpen(false)}
>
  <nav
    className={`nav-menu ${open ? "show" : ""}`}
    onClick={(e) => e.stopPropagation()}
  >

  <div className="drawer-header">

  <button
    className="drawer-close"
    onClick={() => setOpen(false)}
  >
    ✕
  </button>

  <img
    src={profileImg}
    alt="Sheikh"
    className="drawer-avatar"
  />

  <h3>Sheikh Abdul Naasir</h3>

  <p>عالم • مُفَسِّر • داعية</p>

</div>

<NavLink to="/" onClick={() => setOpen(false)}>
  <FiHome />
  <span>Home</span>
</NavLink>

  <NavLink to="/kutub" onClick={() => setOpen(false)}> 
    <FiBook />
    <span>Kutub</span>
  </NavLink>

  <NavLink to="/tafsiir" onClick={() => setOpen(false)}>
    <MdMenuBook />
    <span>Tafsiir</span>
  </NavLink>

  <NavLink to="/lectures" onClick={() => setOpen(false)}>
    <MdHeadphones />
    <span>Muxaadarooyin</span>
  </NavLink>

  <NavLink to="/favorites" onClick={() => setOpen(false)}>
    <MdFavoriteBorder />
    <span>Favorites</span>
  </NavLink>

  <NavLink to="/about" onClick={() => setOpen(false)}>
    <FiInfo />
    <span>About</span>
  </NavLink>

  <NavLink to="/contact" onClick={() => setOpen(false)}>
    <FiMail />
    <span>Contact us</span>
  </NavLink>
  <div className="drawer-footer">
  <p>Tafsiir App v1.0</p>
</div>

</nav>
</div> {/* drawer-wrapper */}


<div className="nav-bottom-line" />

    </header>
    </>
  );
};

export default Navbar;
