//import { Link } from "react-router-dom";

import FAQ from "../components/FAQ";
import "./Home.css";


import QuickActions from "../components/QuickActions";

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

    <span className="hero-greeting">
      مركز الشيخ عبد الناصر الحاج أحمد
    </span>

    <h1 className="hero-title">
      Sheekh Cabdulnaasir Xaaji Axmed
    </h1>

    <p className="hero-description">
      Ku soo dhawoow madasha rasmiga ah ee Tafsiirka Qur'aanka,
      Muxaadarooyinka iyo Kutubta Sheekh Cabdulnaasir Xaaji Axmed.
    </p>

    <div className="hero-search">
      <input
        type="text"
        placeholder="🔍 Raadi muxaadaro, tafsiir ama kitaab..."
      />
    </div>

  </div>

</section>




      {/* FEATURES */}
      <section className="home-wrapper">

<QuickActions />


        {/* VIDEOS */}
        <section className="home-videos">
          <h2 className="home-videos-title">  Dardaaran  </h2>

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