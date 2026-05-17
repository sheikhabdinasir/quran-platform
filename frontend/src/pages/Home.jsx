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
    <div style={{
  background: "linear-gradient(180deg, #17100A 0%, #21160E 100%)",
  minHeight: "100vh"
}}>        {/* HERO color  */}

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
              <div className="card-top-icon">🎧</div>
              <span className="mini-tag">dhegeysi </span>
            </div>

            <h3>Muxaadarooyin  dhagaysi </h3>
            <p>Halkan ka Dhagayso muxaadarooyinka .</p>

            <span className="card-link-btn">Gal →</span>
          </Link>

          <Link to="/tafsiir" className="home-card">
            <div className="card-top">
              <div className="card-top-icon">🎙️</div>
              <span className="mini-tag">Qur'aan</span>
            </div>

            <h3>Tafsiirka qur'aanka </h3>
            <p>Baro macnaha Qur'aanka.</p>

            <span className="card-link-btn">Gal →</span>
          </Link>

          <Link to="/favorites" className="home-card">
            <div className="card-top">
              <div className="card-top-icon">⭐</div>
              <span className="mini-tag">Best</span>
            </div>

            <h3>Muxaadarooyin Xul ah</h3>
            <p>Casharro  xul ah  oo si gaar ah loo habeeye.</p>

            <span className="card-link-btn">Fur →</span>
          </Link>
        </div>

        {/* VIDEOS */}
        <section className="home-videos">
          <h2 className="home-videos-title"> ⭐ Dardaaran</h2>

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
                <video src={item.video} controls playsInline />

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
:root{
  --primary:#932F2F;
  --secondary:#F5E6E0;
  --gold:#D4AF37;
  --cream:#FFF8F3;
  --dark:#2C1810;
  --white:#ffffff;
}

/* RESET */
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  scroll-behavior:smooth;
}

body{
  font-family:system-ui,sans-serif;
  background:#17100A;
  color:white;
}

/* MAIN PAGE */
.home-wrapper{
  max-width:1200px;
  margin:auto;
  padding:3rem 1rem;
  position:relative;
}

/* GOLD LINE */
.home-wrapper::before{
  content:"";
  width:120px;
  height:4px;
  display:block;
  margin:0 auto 2rem auto;
  border-radius:999px;
  background:linear-gradient(
    90deg,
    transparent,
    var(--gold),
    transparent
  );
}

/* HERO SECTION */
.hero-section{
  min-height:85vh;
  position:relative;
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:1rem;
  text-align:center;
}

.hero-video{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
}

.hero-overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(
    180deg,
    rgba(0,0,0,.55),
    rgba(23,16,10,.90)
  );
}

.hero-content{
  position:relative;
  z-index:2;
  width:100%;
  max-width:760px;
  padding:2rem 1.3rem;
  border-radius:28px;
  backdrop-filter:blur(10px);
  background:rgba(255,255,255,.08);
  border:1px solid rgba(212,175,55,.30);
  box-shadow:0 20px 50px rgba(0,0,0,.45);
}

.hero-badge{
  display:inline-block;
  padding:.45rem 1rem;
  border-radius:999px;
  background:rgba(212,175,55,.15);
  border:1px solid rgba(212,175,55,.35);
  color:white;
  font-size:.8rem;
  font-weight:800;
  margin-bottom:1rem;
}

.hero-content h1{
  font-size:clamp(1.7rem,5vw,3.2rem);
  font-weight:900;
  color:white;
  line-height:1.3;
  margin-bottom:.8rem;
}

.hero-icon{
  font-size:2rem;
  margin-bottom:.8rem;
}

.hero-content p{
  font-size:1rem;
  line-height:1.7;
  color:#f3f3f3;
  max-width:580px;
  margin:auto;
  margin-bottom:1.5rem;
}

.hero-btn{
  display:inline-block;
  padding:.9rem 1.8rem;
  border-radius:999px;
  background:linear-gradient(
    90deg,
    var(--gold),
    #b88a1d
  );
  color:#2C1810;
  text-decoration:none;
  font-weight:900;
  transition:.3s ease;
  box-shadow:0 12px 25px rgba(212,175,55,.30);
}

.hero-btn:hover{
  transform:translateY(-4px);
}

/* TITLES */
.section-title,
.home-videos-title{
  text-align:center;
  font-size:clamp(1.7rem,4vw,2.3rem);
  font-weight:900;
  color:white;
  margin-bottom:2rem;
}

/* CARDS GRID */
.home-cards-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:1.2rem;
}

/* CARD */
.home-card{
  background:linear-gradient(
    180deg,
    #24170F,
    #17100A
  );

  border-radius:24px;
  padding:1.2rem;
  text-decoration:none;
  border:1px solid rgba(212,175,55,.15);
  transition:.3s ease;
  display:flex;
  flex-direction:column;
  min-height:240px;

  box-shadow:0 10px 25px rgba(0,0,0,.30);
}

.home-card:hover{
  transform:translateY(-6px);
  border-color:rgba(212,175,55,.35);

  box-shadow:0 20px 35px rgba(0,0,0,.40);
}

.card-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:1rem;
}

.card-top-icon{
  width:55px;
  height:55px;
  border-radius:18px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:1.3rem;

  background:linear-gradient(
    135deg,
    var(--gold),
    #b88a1d
  );

  color:white;
}

.mini-tag{
  background:rgba(212,175,55,.12);
  color:#F5D76E;
  border:1px solid rgba(212,175,55,.20);

  padding:.35rem .7rem;
  border-radius:999px;
  font-size:.7rem;
  font-weight:800;
}

/* CARD TEXT */
.home-card h3{
  color:white;
  font-size:1.2rem;
  font-weight:900;
  margin-bottom:.6rem;
}

.home-card p{
  color:#e7e7e7;
  line-height:1.7;
  font-size:.95rem;
  margin-bottom:auto;
}

.card-link-btn{
  margin-top:1rem;
  width:fit-content;
  padding:.65rem 1rem;
  border-radius:999px;

  background:linear-gradient(
    90deg,
    var(--primary),
    #b24040
  );

  color:white;
  font-size:.85rem;
  font-weight:800;
}

/* VIDEOS */
.home-videos{
  margin-top:4rem;
}

.video-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:1.3rem;
}

.video-card{
  background:#1B120B;
  border-radius:24px;
  overflow:hidden;

  border:1px solid rgba(212,175,55,.15);

  box-shadow:0 10px 25px rgba(0,0,0,.35);
}

.video-card video{
  width:100%;
  height:240px;
  object-fit:cover;
  background:black;
}

.video-card-info{
  padding:1rem;
}

.tap-text{
  color:#F5D76E;
  font-size:.82rem;
  margin-bottom:.5rem;
}

.video-card-info h4{
  color:white;
  font-size:1.1rem;
  font-weight:900;
  margin-bottom:.4rem;
}

.video-card-info p{
  color:#e3e3e3;
  line-height:1.6;
}

/* FAQ SPACE */
.faq-section{
  margin-top:4rem;
}

/* MOBILE */
@media(max-width:768px){

  .hero-section{
    min-height:72vh;
  }

  .hero-content{
    padding:1.5rem 1rem;
    border-radius:22px;
  }

  .hero-content h1{
    font-size:1.9rem;
  }

  .hero-content p{
    font-size:.95rem;
  }

  .home-wrapper{
    padding:2rem 1rem;
  }

  .home-cards-grid{
    grid-template-columns:1fr;
  }

  .video-grid{
    grid-template-columns:1fr;
  }

  .video-card video{
    height:220px;
  }

}

/* SMALL MOBILE */
@media(max-width:480px){

  .hero-content h1{
    font-size:1.6rem;
  }

  .section-title,
  .home-videos-title{
    font-size:1.5rem;
  }

  .home-card{
    min-height:auto;
  }

}
      `}</style>
    </div>
  );
};

export default Home;