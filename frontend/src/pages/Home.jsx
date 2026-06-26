import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import "./Home.css";

import short1 from "../assets/videos/short1.mp4";
import short2 from "../assets/videos/short2.mp4";
import short3 from "../assets/videos/short3.mp4";

const Home = () => {


  return (

    <div style={{
  background: "#F8F3ED",
  minHeight: "100vh"
}}>
    {/* HERO color  */}

      {/* HERO */}
 
 <section className="hero-section">

  <div className="hero-content">

    <span className="hero-bismillah">
      ﷽
    </span>

    <h1 className="hero-title">
        مركز الشيخ عبد الناصر الحاج أحمد

    </h1>

 <p className="hero-description">
منصة علمية لنشر تفسير القرآن الكريم والمحاضرات والدروس العلمية
</p>

 

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
    </div>
  </Link>

  <Link to="/favorites" className="timeline-item">
    <div className="timeline-number">3</div>

    <div className="timeline-content">
      <h3>⭐ Muxaadarooyin Xul ah</h3>
    </div>
  </Link>

</div>

        {/* VIDEOS */}
        <section className="home-videos">
          <h2 className="home-videos-title">  Dardaaran </h2>

          <div className="video-grid">
            {[
              {
                video: short1,
                title: "Cisadu diinta ayey ku jirtaa",
              },
              {
                video: short2,
                title: "Cibaadadii Rasuulka",
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
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQ />
      </section>

     
    </div>
  );
};
 
export default Home;