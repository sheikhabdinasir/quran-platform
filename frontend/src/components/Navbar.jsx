import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import profileImg from "../assets/sawirprofile.jpeg";

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

  return (
    <header className={`navbar ${hidden ? "hide" : ""}`}>
      <div className="nav-container">

        {/* LEFT */}
        <div className="nav-left">
          <img src={profileImg} alt="Profile" className="nav-avatar" />
          <Link to="/" className="nav-logo">الشيخ عبد الناصر حاج أحمد</Link>
        </div>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* MENU */}
        <nav className={`nav-menu ${open ? "show" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>

          {/* ✅ KUTUB – WAX KALE LAMA BEDDELIN */}
          <NavLink to="/kutub" onClick={() => setOpen(false)}>Kutub</NavLink>

          <NavLink to="/tafsiir" onClick={() => setOpen(false)}>tafsiir </NavLink>




          <NavLink to="/lectures" onClick={() => setOpen(false)}>Muxaadarooyin</NavLink>
          <NavLink to="/favorites" onClick={() => setOpen(false)}>⭐ Favorites</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
          
     


        </nav>
      </div>

      <style>{`
/* ================= NAVBAR GLASS ================= */
.navbar {
  position: sticky;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(12px);
  background: linear-gradient(
    90deg,
    rgba(44,24,16,.92),
    rgba(28,15,10,.92)
  );
  border-bottom: 2px solid rgba(212,175,55,.6);
  box-shadow: 0 10px 35px rgba(0,0,0,.45);
  transition: transform .45s ease, background .4s ease;
}

.navbar.hide {
  transform: translateY(-100%);
}

.nav-container {
  max-width: 1300px;
  margin: auto;
  padding: .85rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ================= LEFT ================= */
.nav-left {
  display: flex;
  align-items: center;
  gap: .8rem;
}

.nav-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid #D4AF37;
  box-shadow: 0 0 0 4px rgba(212,175,55,.25);
  transition: transform .35s ease;
}

.nav-avatar:hover {
  transform: scale(1.08);
}

.nav-logo {
  font-size: 1.6rem;
  font-weight: 900;
  color: #F5E6A8;
  letter-spacing: .5px;
}

/* ================= MENU ================= */
.nav-menu {
  display: flex;
  gap: 1.2rem;
}

.nav-menu a {
  color: #ecf8ebff;
  font-weight: 600;
  padding: .45rem .9rem;
  border-radius: .7rem;
  position: relative;
  transition: all .3s ease;
}

.nav-menu a::after {
  content: "";
  position: absolute;
  left: 15%;
  bottom: 4px;
  width: 70%;
  height: 2px;
  background: linear-gradient(90deg, #D4AF37, #932F2F);
  transform: scaleX(0);
  transition: .35s ease;
}

.nav-menu a:hover::after {
  transform: scaleX(1);
}

.nav-menu a:hover {
  color: #16e620cc;
  background: rgba(7, 81, 239, 0.91);
  border-radius: 50%;
}

/* ================= HAMBURGER ================= */
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 6px;
}

.hamburger span {
  width: 28px;
  height: 3px;
  background: #D4AF37;
  transition: .35s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* ================= MOBILE ================= */
@media (max-width: 900px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: linear-gradient(180deg, #2C1810, #140a06);
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    gap: 1.4rem;
    transform: translateY(-120%);
    opacity: 0;
    pointer-events: none;
    transition: .45s ease;
  }

  .nav-menu.show {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
}
      `}</style>
    </header>
  );
};

export default Navbar;
