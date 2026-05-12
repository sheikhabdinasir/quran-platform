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
          <NavLink to="/favorites" onClick={() => setOpen(false)}>Muxaadoryin xul ah</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact US</NavLink>
          
     


        </nav>
      </div>

      <style>{`
/* ================= NAVBAR GLASS ================= */
/* ================= NAVBAR ================= */

.navbar{
  position:sticky;
  top:0;
  z-index:999;
  backdrop-filter:blur(14px);
  background:
  linear-gradient(
    90deg,
    rgba(25,15,10,.96),
    rgba(44,24,16,.94)
  );
  border-bottom:
  1px solid rgba(212,175,55,.45);

  box-shadow:
  0 8px 30px rgba(0,0,0,.35);

  transition:
  transform .4s ease,
  background .4s ease;
}

.navbar.hide{
  transform:translateY(-100%);
}

/* ================= CONTAINER ================= */

.nav-container{
  max-width:1400px;
  margin:auto;

  padding:
  .9rem 2rem;

  display:flex;
  align-items:center;
  justify-content:space-between;

  gap:2rem;
}

/* ================= LEFT ================= */

.nav-left{
  display:flex;
  align-items:center;
  gap:1rem;

  flex-shrink:0;
}

.nav-avatar{
  width:60px;
  height:60px;

  border-radius:50%;

  border:
  3px solid #D4AF37;

  object-fit:cover;

  box-shadow:
  0 0 0 4px rgba(212,175,55,.15);

  transition:
  transform .35s ease;
}

.nav-avatar:hover{
  transform:scale(1.08);
}

.nav-logo{
  color:#F5E6A8;

  font-size:1.55rem;
  font-weight:900;

  letter-spacing:.3px;

  white-space:nowrap;
}

/* ================= MENU ================= */

.nav-menu{
  display:flex;
  align-items:center;

  gap:.6rem;

  flex-wrap:wrap;
}

.nav-menu a{
  color:#fff;

  font-size:.97rem;
  font-weight:600;

  padding:
  .7rem 1rem;

  border-radius:999px;

  position:relative;

  transition:
  all .3s ease;
}

/* ACTIVE LINK */

.nav-menu a.active{
  background:
  linear-gradient(
    90deg,
    #D4AF37,
    #a37d12
  );

  color:#1a1a1a;

  font-weight:700;

  box-shadow:
  0 4px 15px rgba(212,175,55,.35);
}

/* HOVER */

.nav-menu a:hover{
  background:
  rgba(212,175,55,.12);

  color:#D4AF37;

  transform:
  translateY(-2px);
}

/* ================= HAMBURGER ================= */

.hamburger{
  display:none;

  background:none;
  border:none;

  cursor:pointer;

  flex-direction:column;

  gap:6px;

  z-index:1001;
}

.hamburger span{
  width:30px;
  height:3px;

  border-radius:20px;

  background:#D4AF37;

  transition:.35s ease;
}

.hamburger.active span:nth-child(1){
  transform:
  rotate(45deg)
  translate(6px,6px);
}

.hamburger.active span:nth-child(2){
  opacity:0;
}

.hamburger.active span:nth-child(3){
  transform:
  rotate(-45deg)
  translate(7px,-7px);
}

/* ================= TABLET ================= */

@media(max-width:1100px){

  .nav-logo{
    font-size:1.2rem;
  }

  .nav-menu{
    gap:.2rem;
  }

  .nav-menu a{
    padding:
    .6rem .8rem;

    font-size:.9rem;
  }

}

/* ================= MOBILE ================= */

@media(max-width:900px){

  .nav-container{
    padding:
    .8rem 1rem;
  }

  .hamburger{
    display:flex;
  }

  .nav-avatar{
    width:50px;
    height:50px;
  }

  .nav-logo{
    font-size:1rem;

    max-width:180px;

    overflow:hidden;
    text-overflow:ellipsis;
  }

  .nav-menu{

    position:absolute;

    top:100%;
    left:0;

    width:100%;

    background:
    linear-gradient(
      180deg,
      #2C1810,
      #140a06
    );

    flex-direction:column;

    align-items:center;

    padding:
    2rem 1rem;

    gap:1rem;

    border-bottom:
    1px solid rgba(212,175,55,.3);

    box-shadow:
    0 15px 35px rgba(0,0,0,.4);

    transform:
    translateY(-120%);

    opacity:0;

    pointer-events:none;

    transition:.45s ease;
  }

  .nav-menu.show{
    transform:translateY(0);

    opacity:1;

    pointer-events:auto;
  }

  .nav-menu a{
    width:100%;

    text-align:center;

    font-size:1rem;
  }

}

/* ================= SMALL MOBILE ================= */

@media(max-width:500px){

  .nav-logo{
    font-size:.9rem;
  }

  .nav-avatar{
    width:44px;
    height:44px;
  }

}
      `}</style>
    </header>
  );
};

export default Navbar;
