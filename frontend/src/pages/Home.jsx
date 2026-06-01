import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";

import hero1 from "../assets/hero1.mp4";
import hero2 from "../assets/hero2.mp4";
import hero3 from "../assets/hero3.mp4";

import short1 from "../assets/videos/short1.mp4";
import short2 from "../assets/videos/short2.mp4";
import short3 from "../assets/videos/short3.mp4";

const Home = () => {
  const heroVideos = [hero1, hero2, hero3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroVideos.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #17100A 0%, #21160E 100%)",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <section className="hero-section">
        <video
          key={currentIndex}
          src={heroVideos[currentIndex]}
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-badge">﷽ </span>

          <h1>مركز الشيخ عبد الناصر الحاج أحمد</h1>

          <div className="hero-icon">📖</div>

          <p>
            Ku soo dhawoow madasha Shiikh Cabdinaasir ee faafinta diinka Rabbi.
          </p>

          <Link to="/tafsiir" className="hero-btn">
            Bilow Hadda →
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="home-wrapper">
        <h2 className="section-title">🌙 Maxaad Ka Helaysaa Madashan?</h2>

        <div className="home-cards-grid">
          <Link to="/lectures" className="home-card">
            <div className="card-top">
              <div className="card-top-icon" aria-hidden="true">
                🎧
              </div>
              <span className="mini-tag">dhegeysi</span>
            </div>

            <h3>Muxaadarooyin</h3>
            <p>Halkan ka Dhegeyso muxaadarooyinka .</p>

            <span className="card-link-btn">
              Gal <span className="card-arrow" aria-hidden="true">→</span>
            </span>
          </Link>

          <Link to="/tafsiir" className="home-card">
            <div className="card-top">
              <div className="card-top-icon" aria-hidden="true">
                🎙️
              </div>
              <span className="mini-tag">Qur&apos;aan</span>
            </div>

            <h3>Tafsiirka qur&apos;aanka</h3>
            <p>Baro macnaha Qur&apos;aanka.</p>

            <span className="card-link-btn">
              Gal <span className="card-arrow" aria-hidden="true">→</span>
            </span>
          </Link>

          <Link to="/favorites" className="home-card">
            <div className="card-top">
              <div className="card-top-icon" aria-hidden="true">
                ⭐
              </div>
              <span className="mini-tag">xul</span>
            </div>

            <h3>Muxaadarooyin Xul ah</h3>
            <p>muxaadarooyin xul ah oo si gaar ah loo habeeye.</p>

            <span className="card-link-btn">
              Fur <span className="card-arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        </div>

        {/* VIDEOS */}
        <section className="home-videos">
          <h2 className="home-videos-title">⭐ Dardaaran ⭐</h2>

          <div className="video-grid">
            {[
              {
                video: short1,
                title: "Cisadu diinta ayey ku jirtaa",
                desc: "Diintaada ku dhagganoow ⭐⭐⭐⭐",
              },
              {
                video: short2,
                title: "Cibaadadii Rasuulka",
                desc: "Fahamka Qur'aanka ⭐⭐⭐",
              },
              {
                video: short3,
                title: "Dardaaran",
                desc: "Ilaasho diintaada ⭐⭐⭐",
              },
            ].map((item, i) => (
              <div className="video-card" key={i}>
                <div className="video-card-media">
                  <video src={item.video} controls playsInline />
                </div>

                <div className="video-card-info">
                  <p className="tap-text">▶️ Taabo si aad u daawato</p>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQ />
      </section>

      <style>{`
/* ===== ISLAMIC PREMIUM COLORS ===== */
:root {
  --primary: #932f2f;
  --primary-light: #b24040;
  --secondary: #f5e6e0;
  --gold: #d4af37;
  --gold-light: #f5d76e;
  --gold-dark: #b88a1d;
  --cream: #fff8f3;
  --dark: #2c1810;
  --white: #ffffff;
  --bg-deep: #17100a;
  --bg-card: #1f1510;
  --bg-card-hover: #2a1c14;
  --text-muted: #c9bdb4;
  --border-gold: rgba(212, 175, 55, 0.22);
  --border-gold-strong: rgba(212, 175, 55, 0.45);
  --shadow-card: 0 12px 40px rgba(0, 0, 0, 0.35);
  --shadow-card-hover: 0 24px 48px rgba(0, 0, 0, 0.5);
  --radius-card: 22px;
  --transition: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  background: var(--bg-deep);
  color: var(--white);
  -webkit-font-smoothing: antialiased;
}

.home-wrapper {
  max-width: 1200px;
  margin: auto;
  padding: clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2rem);
  position: relative;
}

.home-wrapper::before {
  content: "";
  width: min(140px, 40vw);
  height: 4px;
  display: block;
  margin: 0 auto 2rem auto;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

/* HERO */
.hero-section {
  min-height: 85vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.55),
    rgba(23, 16, 10, 0.9)
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 760px;
  padding: 2rem 1.3rem;
  border-radius: 28px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border-gold);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
}

.hero-badge {
  display: inline-block;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid var(--border-gold-strong);
  color: white;
  font-size: 0.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero-content h1 {
  font-size: clamp(1.7rem, 5vw, 3.2rem);
  font-weight: 900;
  color: white;
  line-height: 1.3;
  margin-bottom: 0.8rem;
}

.hero-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.hero-content p {
  font-size: 1rem;
  line-height: 1.7;
  color: #f3f3f3;
  max-width: 580px;
  margin: auto auto 1.5rem;
}

.hero-btn {
  display: inline-block;
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--gold), var(--gold-dark));
  color: var(--dark);
  text-decoration: none;
  font-weight: 900;
  transition: var(--transition);
  box-shadow: 0 12px 25px rgba(212, 175, 55, 0.3);
}

.hero-btn:hover {
  transform: translateY(-4px);
}

.hero-btn:focus-visible {
  outline: 3px solid var(--gold-light);
  outline-offset: 4px;
}

/* TITLES */
.section-title,
.home-videos-title {
  text-align: center;
  font-size: clamp(1.5rem, 4vw, 2.3rem);
  font-weight: 900;
  color: white;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  letter-spacing: -0.02em;
}

/* ===== FEATURE CARDS GRID ===== */
.home-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2.5vw, 1.5rem);
  align-items: stretch;
}

/* ===== PREMIUM FEATURE CARD ===== */
.home-card {
  position: relative;
  isolation: isolate;
  background: linear-gradient(
    165deg,
    rgba(42, 28, 20, 0.95) 0%,
    rgba(23, 16, 10, 0.98) 55%,
    rgba(15, 10, 7, 1) 100%
  );
  border-radius: var(--radius-card);
  padding: clamp(1.15rem, 3vw, 1.5rem);
  text-decoration: none;
  border: 1px solid var(--border-gold);
  transition: transform var(--transition), box-shadow var(--transition),
    border-color var(--transition), background var(--transition);
  display: flex;
  flex-direction: column;
  min-height: 260px;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

/* subtle gold shine on top */
.home-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--gold),
    var(--gold-light),
    var(--gold),
    transparent
  );
  opacity: 0.85;
  z-index: 1;
}

/* soft glow corner */
.home-card::after {
  content: "";
  position: absolute;
  top: -40%;
  right: -30%;
  width: 70%;
  height: 70%;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.12) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
  transition: opacity var(--transition);
}

.home-card:hover {
  transform: translateY(-8px);
  border-color: var(--border-gold-strong);
  box-shadow: var(--shadow-card-hover), 0 0 0 1px rgba(212, 175, 55, 0.08);
  background: linear-gradient(
    165deg,
    rgba(52, 34, 24, 0.98) 0%,
    rgba(28, 19, 12, 1) 100%
  );
}

.home-card:hover::after {
  opacity: 1.4;
}

.home-card:active {
  transform: translateY(-4px);
}

.home-card:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 4px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.15rem;
  position: relative;
  z-index: 2;
}

.card-top-icon {
  width: clamp(52px, 12vw, 58px);
  height: clamp(52px, 12vw, 58px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;
  background: linear-gradient(145deg, var(--gold) 0%, var(--gold-dark) 100%);
  color: var(--dark);
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: transform var(--transition), box-shadow var(--transition);
}

.home-card:hover .card-top-icon {
  transform: scale(1.06) rotate(-2deg);
  box-shadow: 0 12px 28px rgba(212, 175, 55, 0.45);
}

.mini-tag {
  background: rgba(212, 175, 55, 0.1);
  color: var(--gold-light);
  border: 1px solid var(--border-gold);
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
  backdrop-filter: blur(6px);
}

.home-card h3 {
  color: var(--white);
  font-size: clamp(1.1rem, 2.5vw, 1.25rem);
  font-weight: 900;
  margin-bottom: 0.55rem;
  line-height: 1.35;
  position: relative;
  z-index: 2;
}

.home-card p {
  color: var(--text-muted);
  line-height: 1.65;
  font-size: clamp(0.88rem, 2vw, 0.95rem);
  margin-bottom: auto;
  flex-grow: 1;
  position: relative;
  z-index: 2;
}

.card-link-btn {
  margin-top: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  max-width: 100%;
  padding: 0.75rem 1.1rem;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: var(--white);
  font-size: 0.88rem;
  font-weight: 800;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 6px 16px rgba(147, 47, 47, 0.35);
  transition: background var(--transition), transform var(--transition),
    box-shadow var(--transition);
  position: relative;
  z-index: 2;
}

.home-card:hover .card-link-btn {
  background: linear-gradient(135deg, #a83838 0%, #c44a4a 100%);
  box-shadow: 0 10px 22px rgba(147, 47, 47, 0.45);
}

.card-arrow {
  display: inline-block;
  transition: transform var(--transition);
}

.home-card:hover .card-arrow {
  transform: translateX(4px);
}

/* ===== VIDEO SECTION ===== */
.home-videos {
  margin-top: clamp(3rem, 8vw, 4.5rem);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2.5vw, 1.5rem);
}

.video-card {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(31, 21, 16, 0.98) 0%,
    rgba(23, 16, 10, 1) 100%
  );
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 1px solid var(--border-gold);
  box-shadow: var(--shadow-card);
  transition: transform var(--transition), box-shadow var(--transition),
    border-color var(--transition);
}

.video-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-gold-strong);
  box-shadow: var(--shadow-card-hover);
}

.video-card-media {
  position: relative;
  background: #0a0705;
  line-height: 0;
}

.video-card-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba(23, 16, 10, 0.4) 100%
  );
  pointer-events: none;
}

.video-card video {
  width: 100%;
  height: clamp(200px, 28vw, 260px);
  object-fit: cover;
  display: block;
  background: black;
}

.video-card-info {
  padding: clamp(0.9rem, 2.5vw, 1.15rem);
}

.tap-text {
  color: var(--gold-light);
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.45rem;
  opacity: 0.95;
}

.video-card-info h4 {
  color: var(--white);
  font-size: clamp(1rem, 2.5vw, 1.12rem);
  font-weight: 900;
  margin-bottom: 0.35rem;
  line-height: 1.35;
}

.video-card-info p {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.9rem;
}

.faq-section {
  margin-top: 4rem;
}

/* TABLET */
@media (max-width: 1024px) {
  .home-cards-grid,
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .hero-section {
    min-height: 72vh;
  }

  .hero-content {
    padding: 1.5rem 1rem;
    border-radius: 22px;
  }

  .hero-content h1 {
    font-size: 1.9rem;
  }

  .hero-content p {
    font-size: 0.95rem;
  }

  .home-cards-grid,
  .video-grid {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .home-card {
    min-height: auto;
    padding: 1.25rem;
  }

  .home-card:hover {
    transform: translateY(-4px);
  }

  .video-card video {
    height: min(56vw, 280px);
  }
}

/* SMALL MOBILE */
@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 1.55rem;
  }

  .section-title,
  .home-videos-title {
    font-size: 1.4rem;
  }

  .card-top-icon {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }

  .card-link-btn {
    padding: 0.85rem 1rem;
    min-height: 48px;
  }
}

/* LARGE SCREENS */
@media (min-width: 1280px) {
  .home-cards-grid {
    gap: 1.75rem;
  }

  .home-card {
    min-height: 280px;
  }
}

/* ACCESSIBILITY */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }

  .home-card:hover,
  .video-card:hover {
    transform: none;
  }
}
      `}</style>
    </div>
  );
};

export default Home;