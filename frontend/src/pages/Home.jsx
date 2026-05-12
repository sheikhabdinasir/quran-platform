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
          <span className="hero-badge">﷽ Islamic Premium Center</span>

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
              <span className="mini-tag">Audio</span>
            </div>

            <h3>Muxaadarooyin Audio</h3>
            <p>Dhagayso muxaadarooyin qiimo leh oo nadiif ah.</p>

            <span className="card-link-btn">Gal →</span>
          </Link>

          <Link to="/tafsiir" className="home-card">
            <div className="card-top">
              <div className="card-top-icon">🎙️</div>
              <span className="mini-tag">Qur'aan</span>
            </div>

            <h3>Tafsiir Audio</h3>
            <p>Baro macnaha Qur'aanka si fudud oo qurux badan.</p>

            <span className="card-link-btn">Gal →</span>
          </Link>

          <Link to="/favorites" className="home-card">
            <div className="card-top">
              <div className="card-top-icon">⭐</div>
              <span className="mini-tag">Best</span>
            </div>

            <h3>Muxaadarooyin Xul ah</h3>
            <p>Casharro la xulay oo si gaar ah kuu anfaca.</p>

            <span className="card-link-btn">Fur →</span>
          </Link>
        </div>

        {/* VIDEOS */}
        <section className="home-videos">
          <h2 className="home-videos-title">🎥 Dardaaran</h2>

          <div className="video-grid">
            {[
              {
                video: short1,
                title: "Cisadu diinta ayey ku jirtaa",
                desc: "Diinta ku dhagganoow ⭐⭐⭐⭐",
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
}

/* GLOBAL */
*{
margin:0;
padding:0;
box-sizing:border-box;
scroll-behavior:smooth;
}

body{
background:#17100A;
color:#fff;
font-family:'Inter',sans-serif;
}

/* HERO */
.hero-section{
min-height:72vh;
position:relative;
overflow:hidden;
display:flex;
align-items:center;
justify-content:center;
padding:1rem;
text-align:center;

background:linear-gradient(
135deg,
rgba(22,16,44,.78),
rgba(147,47,47,.70)
);
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
rgba(0,0,0,.45),
rgba(44,24,16,.72)
);
}

.hero-content{
position:relative;
z-index:2;

max-width:760px;
width:100%;

padding:1.5rem 1rem;

border-radius:24px;

backdrop-filter:blur(8px);

background:rgba(255,255,255,.08);

border:1px solid rgba(212,175,55,.45);

color:#fff;

box-shadow:0 18px 40px rgba(0,0,0,.22);
}

.hero-badge{
display:inline-block;

padding:.4rem .95rem;

border-radius:999px;

background:rgba(212,175,55,.16);

border:1px solid rgba(212,175,55,.4);

font-size:.78rem;
font-weight:700;

margin-bottom:.9rem;
}

.hero-content h1{
font-size:clamp(1.5rem,4vw,2.7rem);

font-weight:900;

line-height:1.25;

margin-bottom:.55rem;

color:#fff;
}

.hero-icon{
font-size:1.6rem;
margin-bottom:.65rem;
}

.hero-content p{
font-size:.95rem;

line-height:1.6;

max-width:540px;

margin:auto;
margin-bottom:1.1rem;

color:#f5f5f5;
}

.hero-btn{
display:inline-block;

padding:.78rem 1.6rem;

border-radius:999px;

background:linear-gradient(
90deg,
#D4AF37,
#B88A1D
);

color:#2C1810;

font-weight:900;

text-decoration:none;

font-size:.92rem;

box-shadow:0 10px 24px rgba(212,175,55,.28);

transition:.3s ease;
}

.hero-btn:hover{
transform:translateY(-2px);
}

/* WRAPPER */
.home-wrapper{
max-width:1180px;

margin:auto;

padding:2rem 1rem;

position:relative;
}

.home-wrapper::before{
content:"";

display:block;

width:90px;
height:4px;

margin:0 auto 24px auto;

border-radius:999px;

background:linear-gradient(
90deg,
transparent,
var(--gold),
transparent
);
}

/* TITLES */
.section-title,
.home-videos-title{
text-align:center;

color:#ffffff;

text-shadow:0 0 18px rgba(255,255,255,.08);
}

.section-title{
font-size:clamp(1.5rem,3vw,2rem);
font-weight:900;
margin-bottom:1.5rem;
}

.home-videos-title{
font-size:1.8rem;
font-weight:900;
margin-bottom:1.4rem;
}

/* CARDS GRID */
.home-cards-grid{
display:grid;

grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));

gap:.9rem;

margin-top:1rem;
}

/* CARDS */
.home-card{
background:linear-gradient(
180deg,
#22140C,
#17100A
);

border:1px solid rgba(212,175,55,.18);

border-radius:18px;

padding:.9rem;

text-decoration:none;

color:inherit;

box-shadow:0 10px 24px rgba(0,0,0,.35);

transition:.25s ease;

display:flex;

flex-direction:column;

min-height:190px;
}

.home-card:hover{
transform:translateY(-5px);

box-shadow:0 18px 34px rgba(0,0,0,.45);
}

.card-top{
display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:.7rem;
}

.card-top-icon{
width:46px;
height:46px;

border-radius:14px;

background:linear-gradient(
135deg,
#D4AF37,
#B88A1D
);

display:flex;

align-items:center;
justify-content:center;

font-size:1.15rem;

color:#fff;
}

.mini-tag{
font-size:.68rem;

font-weight:800;

padding:.3rem .55rem;

border-radius:999px;

background:#f8ecd0;

color:#8b6914;
}

.home-card h3{
font-size:1rem;

font-weight:900;

color:#ffffff;

margin-bottom:.35rem;

line-height:1.35;
}

.home-card p{
font-size:.94rem;

line-height:1.5;

color:#ffffffcc;

margin-bottom:auto;
}

.card-link-btn{
margin-top:.8rem;

display:inline-block;

padding:.52rem .7rem;

border-radius:999px;

background:linear-gradient(
90deg,
var(--dark),
var(--primary)
);

color:#fff;

font-size:.8rem;

font-weight:800;

width:fit-content;
}

/* VIDEOS */
.home-videos{
margin-top:3rem;
}

.video-grid{
display:grid;

grid-template-columns:
repeat(auto-fit,minmax(250px,1fr));

gap:1rem;
}

.video-card{
background:#1B120B;

border:1px solid rgba(212,175,55,.18);

border-radius:18px;

overflow:hidden;

box-shadow:0 10px 24px rgba(0,0,0,.35);
}

.video-card video{
width:100%;

height:220px;

object-fit:cover;

background:#000;
}

.video-card-info{
padding:1rem;
}

.tap-text{
font-size:.8rem;

opacity:.7;

margin-bottom:.4rem;

color:#ffffffb3;
}

.video-card-info h4{
font-size:1rem;

font-weight:900;

margin-bottom:.3rem;

color:#ffffff;
}

.video-card-info p{
font-size:.88rem;

color:#ffffffcc;

line-height:1.45;
}

/* MOBILE */
@media(max-width:768px){

.hero-section{
min-height:62vh;
}

.hero-content{
padding:1.1rem .85rem;

border-radius:20px;
}

.home-cards-grid{
grid-template-columns:1fr;

gap:.8rem;
}

.home-card{
min-height:170px;
}

.video-card video{
height:200px;
}

}

      `}</style>
    </div>
  );
};

export default Home;