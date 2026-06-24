import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";


import short1 from "../assets/videos/short1.mp4";
import short2 from "../assets/videos/short2.mp4";
import short3 from "../assets/videos/short3.mp4";

const Home = () => {


  return (
    <div style={{
  background: "linear-gradient(180deg, #17100A 0%, #21160E 100%)",
  minHeight: "100vh"
}}>        {/* HERO color  */}

      {/* HERO */}
 
 <section className="hero-section">

  <div className="hero-content">

    <span className="hero-bismillah">
      ﷽
    </span>

    <h1 className="hero-title">
      MADASHA SHIIKH CABDINAASIR XAAJI AXMED
    </h1>

 <p className="hero-description">
  Ku soo dhawoow madal ay ku jiraan
  Tafsiirka Qur'aanka Kariimka,
  Muxaadarooyin Islaami ah,
  Kutub Islaami ah iyo Duruus cilmiyeed
  oo uu soo jeediyey Shiikh Cabdinaasir Xaaji Axmed.
</p>

    <div className="hero-buttons">

      <Link
        to="/kutub"
        className="hero-btn-secondary"
      >
        📖 Kutubta
      </Link>

      <Link
        to="/lectures"
        className="hero-btn-primary"
      >
        🎧 Muxaadarooyinka
      </Link>

      <Link
        to="/tafsiir"
        className="hero-btn-secondary"
      >
        📚 Tafsiirka
      </Link>

    </div>

  </div>

</section>

      {/* FEATURES */}
      <section className="home-wrapper">
        <h2 className="section-title">🌙 Maxaad Ka Helaysaa Madashan?</h2>

  <div className="timeline-wrapper">

  <Link to="/lectures" className="timeline-item">
    <div className="timeline-number">1</div>

    <div className="timeline-content">
      <h3>🎧 Muxaadarooyin</h3>
      <p>Halkan ka Dhegeyso muxaadarooyinka.</p>
    </div>
  </Link>

  <Link to="/tafsiir" className="timeline-item">
    <div className="timeline-number">2</div>

    <div className="timeline-content">
      <h3>🎙️ Tafsiirka Qur'aanka</h3>
      <p>Baro macnaha Qur'aanka.</p>
    </div>
  </Link>

  <Link to="/favorites" className="timeline-item">
    <div className="timeline-number">3</div>

    <div className="timeline-content">
      <h3>⭐ Muxaadarooyin Xul ah</h3>
      <p>Muxaadarooyin xul ah oo si gaar ah loo habeeyey.</p>
    </div>
  </Link>

</div>

        {/* VIDEOS */}
        <section className="home-videos">
          <h2 className="home-videos-title"> ⭐ Dardaaran ⭐ </h2>

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








.hero-content{
  position:relative;
  z-index:2;

  max-width:800px;

  padding:0 1.5rem;

  text-align:center;
}




 
 

  .hero-bismillah{
  display:block; 
  color:var(--gold);
  font-size:1.4rem;
  font-weight:900;
  margin-bottom:1rem;
}

.hero-title{
  font-size:clamp(2.8rem,6vw,5rem);
  font-weight:900;
  line-height:1.15;
  color:white;
  margin-bottom:1.5rem;
  text-shadow:0 8px 25px rgba(0,0,0,.4);
}

.hero-description{
  color:#f5f5f5;
  font-size:1.15rem;
  line-height:1.9;
  max-width:700px;
  margin:0 auto 2.5rem;
}

.hero-buttons{
  display:flex;
  justify-content:center;
  gap:1rem;
  flex-wrap:wrap;
}

.hero-btn-primary{
  padding:1rem 2rem;
  border-radius:999px;
  text-decoration:none;
  font-weight:900;
  background:linear-gradient(
    135deg,
    var(--gold),
    #b88a1d
  );
  color:#2C1810;
  transition:.3s;
}

.hero-btn-secondary{
  padding:1rem 2rem;
  border-radius:999px;
  text-decoration:none;
  font-weight:900;
  color:white;
  border:1px solid rgba(212,175,55,.4);
  background:rgba(255,255,255,.05);
  transition:.3s;
}

.hero-btn-primary:hover,
.hero-btn-secondary:hover{
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

/* =========================
   TIMELINE FEATURES
========================= */

.timeline-wrapper{
  max-width:850px;
  margin:0 auto;
  display:flex;
  flex-direction:column;
  gap:3rem;
}

.timeline-item{
  position:relative;
  display:block;
  padding-left:90px;
  color:white;
  transition:.3s ease;
}


.timeline-item:hover{
  transform:translateX(6px);
}

.timeline-number{
  position:absolute;
  left:0;
  top:0;

  width:50px;
  height:50px;

  border-radius:50%;
  background:linear-gradient(135deg,var(--gold),#b88a1d);

  color:#2C1810;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:1.2rem;
  font-weight:900;

  box-shadow:0 0 20px rgba(212,175,55,.35);

  transition:.3s ease;
}

.timeline-item:hover .timeline-number{
  transform:scale(1.08);
}



.timeline-item::before{
  content:"";
  position:absolute;
  left:24px;
  top:50px;

  width:2px;
  height:calc(100% + 30px);

  background:rgba(212,175,55,.5);
}

.timeline-item:last-child::before{
  display:none;
}

.timeline-content{
  position:relative;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(212,175,55,.2);
  border-radius:22px;

  padding:1.6rem 1.5rem;   /* CHANGE */

  backdrop-filter:blur(10px);
  transition:.3s ease;
}

.timeline-content:hover{
  border-color:rgba(212,175,55,.45);

  box-shadow:0 15px 35px rgba(0,0,0,.35);
}
.timeline-content::before{
  content:"";
  position:absolute;

  left:-42px;
  top:0;

  width:42px;
  height:28px;

  border-left:2px solid rgba(212,175,55,.55);
  border-top:2px solid rgba(212,175,55,.55);

  border-top-left-radius:18px;
}

.timeline-content::after{
  content:"";

  position:absolute;

  right:-10px;
  top:28px;

  width:12px;
  height:12px;

  border-radius:50%;

  background:var(--gold);

  box-shadow:0 0 12px rgba(212,175,55,.6);
}

.timeline-content h3{
  font-size:1.2rem;
  font-weight:900;
  margin-bottom:.5rem;
}

.timeline-content p{
  color:#e6e6e6;
  line-height:1.7;
}

/* TABLET */
@media(max-width:768px){

  .timeline-wrapper{
    gap:2rem;
  }

  .timeline-item{
    padding-left:70px;
  }

  .timeline-number{
    width:42px;
    height:42px;
    font-size:1rem;
  }

  .timeline-item::before{
    left:20px;
  }

  .timeline-content{
    padding:1.2rem;
  }

  .timeline-content::before{
    width:32px;
    left:-32px;
  }
}

/* MOBILE */
@media(max-width:480px){

  .timeline-item{
    padding-left:60px;
  }

  .timeline-number{
    width:38px;
    height:38px;
  }

  .timeline-item:hover{
    transform:none;
  }

  .timeline-content h3{
    font-size:1.05rem;
  }

  .timeline-content p{
    font-size:.92rem;
  }

  .timeline-content::after{
    width:10px;
    height:10px;
  }
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
    padding:0 1rem;
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
    font-size:1.8rem;
  }

  .section-title,
  .home-videos-title{
    font-size:1.5rem;
  }


}
      `}</style>
    </div>
  );
};

export default Home;