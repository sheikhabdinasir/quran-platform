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

      {/* TOP GOLD BORDER ACCENT */}
      <div className="nav-top-line" />

      <div className="nav-container">

        {/* LEFT */}
        <div className="nav-left">
          <div className="nav-avatar-ring">
            <img src={profileImg} alt="Profile" className="nav-avatar" />
          </div>
          <div className="nav-brand">
            <Link to="/" className="nav-logo">الشيخ عبد الناصر حاج أحمد</Link>
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
          <NavLink to="/favorites" onClick={() => setOpen(false)}>Muxaadoryin xul ah</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact US</NavLink>
        </nav>
      </div>

      {/* BOTTOM ORNAMENT LINE */}
      <div className="nav-bottom-line" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&family=Cinzel:wght@500;700&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');

        /* ============================================================
           CSS VARIABLES — single source of truth
        ============================================================ */
        .navbar {
          --gold:          #D4AF37;
          --gold-bright:   #F0D060;
          --gold-dim:      #8B6914;
          --gold-glow:     rgba(212,175,55,.18);
          --deep:          #0E0805;
          --surface:       #17100A;
          --surface-mid:   #21160E;
          --surface-light: #2C1D12;
          --text-primary:  #F7EAC8;
          --text-muted:    #A89060;
          --border-gold:   rgba(212,175,55,.35);
          --border-soft:   rgba(212,175,55,.12);
        }

        /* ============================================================
           NAVBAR SHELL
        ============================================================ */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 999;
          background:
            linear-gradient(180deg,
              var(--surface) 0%,
              var(--surface-mid) 100%
            );
          border-bottom: 1px solid var(--border-gold);
          box-shadow:
            0 1px 0 rgba(212,175,55,.08) inset,
            0 12px 40px rgba(0,0,0,.55),
            0 2px 0 rgba(0,0,0,.4);
          transition: transform .42s cubic-bezier(.4,0,.2,1);
        }

        .navbar.hide {
          transform: translateY(-100%);
        }

        /* top shimmer line */
        .nav-top-line {
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--gold-dim) 20%,
            var(--gold-bright) 50%,
            var(--gold-dim) 80%,
            transparent 100%
          );
        }

        /* bottom hairline */
        .nav-bottom-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--border-gold) 30%,
            var(--border-gold) 70%,
            transparent 100%
          );
          opacity: .6;
        }

        /* ============================================================
           CONTAINER
        ============================================================ */
        .nav-container {
          max-width: 1400px;
          margin: auto;
          padding: .85rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        /* ============================================================
           LEFT — AVATAR + BRAND
        ============================================================ */
        .nav-left {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          flex-shrink: 0;
        }

        /* octagonal-ish ring via clip-path feel with box shadows */
        .nav-avatar-ring {
          position: relative;
          padding: 3px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-bright), var(--gold-dim), var(--gold-bright));
          box-shadow:
            0 0 0 1px rgba(212,175,55,.15),
            0 0 14px rgba(212,175,55,.25),
            0 0 28px rgba(212,175,55,.08);
          flex-shrink: 0;
        }

        .nav-avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          border: 2px solid var(--surface);
          transition: transform .4s ease;
        }

        .nav-avatar-ring:hover .nav-avatar {
          transform: scale(1.06);
        }

        .nav-brand {
          display: flex;
          flex-direction: column;
          gap: .18rem;
        }

        .nav-logo {
          font-family: 'Scheherazade New', 'Amiri', serif;
          color: var(--gold-bright);
          font-size: 1.65rem;
          font-weight: 700;
          letter-spacing: .5px;
          line-height: 1;
          white-space: nowrap;
          text-shadow:
            0 0 20px rgba(240,208,96,.3),
            0 1px 2px rgba(0,0,0,.6);
          transition: color .3s;
        }

        .nav-logo:hover {
          color: #fff;
        }

        .nav-tagline {
          font-family: 'Amiri', serif;
          font-size: .78rem;
          color: var(--text-muted);
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding-left: 2px;
        }

        @media (max-width: 900px) {
          .nav-tagline { display: none; }
          .nav-logo {
            font-size: 1rem;
            max-width: 160px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        @media (max-width: 500px) {
          .nav-logo {
            font-size: .88rem;
            max-width: 120px;
          }
        }

        /* ============================================================
           NAV MENU
        ============================================================ */
        .nav-menu {
          display: flex;
          align-items: center;
          gap: .3rem;
          flex-wrap: wrap;
        }

        .nav-menu a {
          font-family: 'Cinzel', 'Georgia', serif;
          font-size: .78rem;
          font-weight: 500;
          letter-spacing: .8px;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: .55rem 1rem;
          border-radius: 2px;
          position: relative;
          border: 1px solid transparent;
          transition:
            color .28s ease,
            background .28s ease,
            border-color .28s ease,
            transform .25s ease;
        }

        /* underline ornament */
        .nav-menu a::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transition: transform .3s ease;
        }

        .nav-menu a:hover::after,
        .nav-menu a.active::after {
          transform: translateX(-50%) scaleX(1);
        }

        /* HOVER */
        .nav-menu a:hover {
          color: var(--gold-bright);
          background: var(--gold-glow);
          border-color: var(--border-soft);
          transform: translateY(-1px);
        }

        /* ACTIVE LINK */
        .nav-menu a.active {
          color: var(--deep);
          font-weight: 700;
          background:
            linear-gradient(135deg,
              var(--gold-bright) 0%,
              var(--gold) 50%,
              var(--gold-dim) 100%
            );
          border-color: var(--gold-bright);
          box-shadow:
            0 2px 12px rgba(212,175,55,.35),
            0 1px 0 rgba(255,255,255,.15) inset;
          transform: translateY(-1px);
        }

        .nav-menu a.active::after {
          display: none;
        }

        /* ============================================================
           HAMBURGER
        ============================================================ */
        .hamburger {
          display: none;
          background: none;
          border: 1px solid var(--border-gold);
          border-radius: 3px;
          padding: .45rem .5rem;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          z-index: 1001;
          transition: border-color .3s, background .3s;
        }

        .hamburger:hover {
          background: var(--gold-glow);
          border-color: var(--gold);
        }

        .hamburger span {
          width: 22px;
          height: 2px;
          border-radius: 1px;
          background: var(--gold);
          transition: .35s ease;
          display: block;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.active span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* ============================================================
           TABLET
        ============================================================ */
        @media (max-width: 1100px) {
          .nav-logo { font-size: 1.35rem; }
          .nav-menu { gap: .15rem; }
          .nav-menu a { padding: .5rem .75rem; font-size: .72rem; }
          .nav-tagline { display: none; }
        }

        /* ============================================================
           MOBILE
        ============================================================ */
        @media (max-width: 900px) {
          .nav-container { padding: .75rem 1.2rem; }

          .hamburger { display: flex; }

          .nav-avatar { width: 48px; height: 48px; }
          .nav-avatar-ring { padding: 2px; }



          .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background:
              linear-gradient(180deg,
                var(--surface-light) 0%,
                var(--surface) 100%
              );
            flex-direction: column;
            align-items: center;
            padding: 1.8rem 1.5rem 2rem;
            gap: .5rem;
            border-bottom: 1px solid var(--border-gold);
            box-shadow: 0 20px 50px rgba(0,0,0,.6);
            transform: translateY(-110%);
            opacity: 0;
            pointer-events: none;
            transition: transform .42s cubic-bezier(.4,0,.2,1), opacity .38s ease;
          }

          .nav-menu.show {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }

          .nav-menu a {
            width: 100%;
            text-align: center;
            font-size: .85rem;
            padding: .75rem 1rem;
            letter-spacing: 1.2px;
            border: 1px solid var(--border-soft);
          }

          .nav-menu a:hover,
          .nav-menu a.active {
            width: 100%;
          }

          /* decorative divider between mobile menu items */
          .nav-menu a + a {
            border-top-color: transparent;
          }
        }

        /* ============================================================
           SMALL MOBILE
        ============================================================ */
        @media (max-width: 500px) {
          .nav-container { padding: .7rem 1rem; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
