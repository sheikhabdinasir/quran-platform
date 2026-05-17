import React from "react";

import sheikhImg from "../assets/shiikhcabdinasir.jpeg";

import {
  FaMosque,
  FaQuran,
  FaBookOpen,
  FaHeadphones,
  FaVideo
} from "react-icons/fa";





const About = () => {
  return (
    <div style={{ background: "#FFF8F3", minHeight: "100vh" }}>
      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="overlay" />
        <div className="hero-content">
          <h1 className="hero-title">
            ✨ عن منصة تفسير القرآن الكريم
          </h1>
          <p className="hero-subtitle">
            منصة إسلامية شاملة تهدف إلى نشر فهم القرآن الكريم
            من خلال التفسير، المحاضرات، والدروس الصوتية والمرئية.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="about-container">

        {/* BLOCK 1 */}
        <div className="about-card">
          <h2 className="about-title">
            🕌 ما هي هذه المنصة؟
          </h2>
          <p>
            هذه المنصة مخصصة لنشر <b>تفسير القرآن الكريم</b> بأسلوب منظم
            وسهل الوصول، حيث تم تقسيم المحتوى إلى:
          </p>
          <ul>
            <li>📖 الأجزاء (الأجزاء الثلاثون)</li>
            <li>📘 السور القرآنية</li>
            <li>🎧 مقاطع تفسيرية صوتية ومرئية</li>
          </ul>

          <p>
            تعتمد المنصة على دروس ومحاضرات
            <b> الشيخ عبد الناصر حاجي أحمد</b>، مع تقديم محتوى
            علمي موثوق يخدم طلاب العلم والعامة.
          </p>
        </div>

        {/* BLOCK 2 */}
        <div className="about-card gold">
          <h2 className="about-title">
            ⭐ ماذا تقدم المنصة؟
          </h2>

          <div className="features">
            <div className="feature">🎧 تفسير صوتي واضح ومنظم</div>
            <div className="feature">🎥 دروس ومحاضرات مرئية</div>
            <div className="feature">🔍 نظام بحث سريع ودقيق</div>
            <div className="feature">📱 متوافقة مع الهاتف والكمبيوتر</div>
            <div className="feature">💾 حفظ المحاضرات المفضلة</div>
            <div className="feature">🌍 متاحة لجميع المسلمين</div>
          </div>
        </div>

        {/* BLOCK 3 */}
     
     {/* ================= ISLAMIC INFO BOX ================= */}
<div className="islamic-box">
  <h2 className="islamic-title">
    🕌 ما هي هذه المنصة؟
  </h2>

  <p className="islamic-text">
    هذه المنصة مخصصة لنشر <b>تفسير القرآن الكريم</b> بأسلوب
    منظم، سهل الوصول، ويعتمد على التقسيم العلمي الدقيق
    الذي يساعد المسلم على الفهم والتدبر.
  </p>

  <ul className="islamic-list">
    <li>📖 تقسيم القرآن إلى <b>الأجزاء الثلاثين</b> بشكل واضح</li>
    <li>📘 عرض <b>السور القرآنية</b> مرتبة ومنظمة</li>
    <li>🎧 مقاطع <b>تفسير صوتية</b> بجودة عالية</li>
    <li>🎥 دروس <b>مرئية</b> ومحاضرات نافعة</li>
    <li>🔍 نظام <b>بحث سريع</b> للوصول السهل للمحتوى</li>
    <li>📱 واجهة عصرية تعمل على <b>الهاتف والكمبيوتر</b></li>
  </ul>

  <p className="islamic-text">
    تعتمد المنصة على دروس ومحاضرات
    <b>الشيخ عبد الناصر حاجي أحمد</b>،
    وتُقدِّم محتوى علميًا موثوقًا يخدم
    طلاب العلم والعامة، ويهدف إلى ربط
    المسلم بكتاب الله فهمًا وتدبرًا وعملاً.
  </p>

  <div className="islamic-icons">
    🕋 📿 📖 🕌 🌙 🎧 🎥
  </div>





  
</div>

{/* ================= SHEIKH INFO CARD ================= */}



<div className="about-card gold sheikh-card">

  {/* SHEIKH IMAGE */}
  <div className="sheikh-image-wrapper">
    <img src={sheikhImg} alt="الشيخ عبد الناصر حاجي أحمد" />
  </div>

  <h2 className="about-title">
     من هو الشيخ عبد الناصر حاجي أحمد؟
  </h2>

  <p>
    الشيخ <b>عبد الناصر حاجي أحمد</b> هو أحد العلماء والدعاة
    المعروفين في مجال تفسير القرآن الكريم وتعليمه بأسلوب
    يجمع بين <b>العلم، المنهجية، وسهولة الفهم</b>.
  </p>

  <ul className="sheikh-list">
    <li><FaQuran /> تفسير القرآن الكريم</li>
    <li><FaHeadphones /> دروس صوتية</li>
    <li><FaVideo /> محاضرات مرئية</li>
    <li><FaMosque /> علم شرعي موثوق</li>
  </ul>




  <p>
    يتميز الشيخ بشرحه المتدرج للآيات، وربطه بين
    معاني القرآن الكريم وواقع حياة المسلم.
  </p>
</div>


        {/* BLOCK 4 – AYAH */}
        <div className="ayah-box">
          <p className="ayah">
            ﴿ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ
            لِيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُو الْأَلْبَابِ ﴾
          </p>
          <span>سورة ص — 38 : 29</span>



          <div className="mini-ayahs">

  <div className="mini-ayah">
    <p>﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾</p>
    <span>طه — 114</span>
  </div>

  <div className="mini-ayah">
    <p>﴿وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ 
﴾</p>
    <span>(56)الذاريات  — </span>
  </div>

  <div className="mini-ayah">
    <p>﴿ فَاذْكُرُونِي أَذْكُرْكُمْ ﴾</p>
    <span>البقرة — 152</span>
  </div>

</div>
        </div>

      </section>

      {/* ================= STYLES ================= */}
      <style>{`

      /* ================= ISLAMIC INFO BOX ================= */
.islamic-box {
  background: #FFF8F3;
  border: 2.5px solid #D4AF37;
  border-radius: 1.4rem;
  padding: 2.2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 14px 35px rgba(0,0,0,.12);
  animation: slideUp 1.2s ease;
}

.islamic-title {
  font-size: 2rem;
  font-weight: 900;
  color: #932F2F;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: .6rem;
}

.islamic-text {
  font-size: 1.1rem;
  line-height: 2;
  color: #2C1810;
  margin-bottom: 1.2rem;
}

.islamic-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.islamic-list li {
  font-size: 1.05rem;
  margin-bottom: .7rem;
  padding-left: .4rem;
  color: #2C1810;
  font-weight: 600;
}

.islamic-icons {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.7rem;
  letter-spacing: .4rem;
  color: #D4AF37;
}

        .about-hero {
          position: relative;
          min-height: 45vh;
          background-image: url("https://images.unsplash.com/photo-1602453229139-0fda3b4a2251");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.6);
        }

        .hero-content {
          position: relative;
          max-width: 900px;
          padding: 2rem;
          animation: fadeDown 1.4s ease;
        }

        .hero-title {
          font-size: 2.8rem;
          font-weight: 900;
          color: #FFD700;
          border-bottom: 4px solid #FFD700;
          display: inline-block;
          padding-bottom: .4rem;
          margin-bottom: 1rem;
          text-shadow: 0 6px 18px rgba(0,0,0,.8);
        }

        .hero-subtitle {
          color: #fff;
          font-size: 1.2rem;
          line-height: 1.8;
        }

        .about-container {
          max-width: 1150px;
          margin: 3rem auto;
          padding: 1rem;
          animation: slideUp 1.2s ease;
        }

        .about-card {
          background: #fff;
          padding: 2.2rem;
          border-radius: 1.4rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 15px 35px rgba(0,0,0,.1);
        }

        .about-card.gold {
          border: 3px solid #D4AF37;
          background: #FFF8F3;
        }

        .about-card.dark {
          background: #2C1810;
        }

        .about-title {
          font-size: 1.9rem;
          font-weight: 900;
          color: #2C1810;
          margin-bottom: 1.2rem;
        }

        .about-title.light {
          color: #FFD700;
        }

        .about-card p {
          font-size: 1.1rem;
          line-height: 1.9;
          color: #333;
        }

        .about-card p.light {
          color: #FFF8F3;
        }

        .about-card ul {
          margin: 1rem 0 1.2rem;
          padding-left: 1.2rem;
        }

        .about-card li {
          margin-bottom: .6rem;
          font-size: 1.05rem;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .feature {
          background: #fff;
          padding: 1rem;
          border-radius: .9rem;
          box-shadow: 0 6px 15px rgba(0,0,0,.1);
          font-weight: 600;
        }

        .ayah-box {
          background: linear-gradient(135deg, #2C1810, #1b0f09);
          padding: 2.5rem;
          border-radius: 1.5rem;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,.25);
        }

        .ayah {
          font-size: 1.6rem;
          color: #FFF8F3;
          line-height: 2.2;
          font-weight: 700;
        }

        .ayah-box span {
          display: block;
          margin-top: .8rem;
          color: #D4AF37;
          font-weight: 700;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .hero-title { font-size: 2rem; }
          .ayah { font-size: 1.3rem; }
        }


        /* ===== STRONG SHADOW FOR ALL CARDS ===== */
.about-card,
.islamic-box,
.feature {
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.15),
    0 6px 14px rgba(0, 0, 0, 0.08);
  transition: transform .35s ease, box-shadow .35s ease;
}

.about-card:hover,
.islamic-box:hover,
.feature:hover {
  transform: translateY(-6px);
  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.22),
    0 10px 20px rgba(0, 0, 0, 0.12);
}



.sheikh-card p {
  font-size: 1.08rem;
  line-height: 1.9;
  color: #2C1810;
  margin-bottom: .9rem;
}

.sheikh-list {
  margin: 1.2rem 0;
  padding-left: 1.2rem;
}

.sheikh-list li {
  margin-bottom: .6rem;
  font-weight: 600;
  font-size: 1.05rem;
}

/* ===== SHEIKH ICON LIST ===== */
.sheikh-list li {
  display: flex;
  align-items: center;
  gap: .6rem;
}

.sheikh-list svg {
  color: #D4AF37;
  font-size: 1.25rem;
}

/* ===== SHEIKH IMAGE ===== */
.sheikh-image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.sheikh-image-wrapper img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #D4AF37;
  box-shadow:
    0 10px 25px rgba(0,0,0,.25),
    0 0 0 6px rgba(212,175,55,.15);
  transition: transform .35s ease, box-shadow .35s ease;
}

.sheikh-image-wrapper img:hover {
  transform: scale(1.05);
  box-shadow:
    0 18px 40px rgba(0,0,0,.35),
    0 0 0 8px rgba(212,175,55,.25);
}

/* ===== RTL FIX FOR ARABIC CONTENT ===== */
.sheikh-card {
  direction: rtl;
  text-align: right;
}

.sheikh-card h2,
.sheikh-card p,
.sheikh-card ul {
  text-align: right;
}

/* icons + text ha noqdaan midig → bidix */
.sheikh-list li {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

/* ===== ARABIC RTL FIX ===== */

.hero-title,
.hero-subtitle,
.about-title,
.islamic-title,
.islamic-text,
.islamic-list,
.ayah,
.ayah-box,
.sheikh-card,
.sheikh-card p,
.sheikh-list{
  direction: rtl;
  text-align: right;
}

/* ARABIC TYPOGRAPHY */
.hero-title,
.hero-subtitle,
.about-title,
.islamic-title,
.islamic-text,
.islamic-list li,
.ayah,
.sheikh-card p,
.sheikh-list li{
  font-family:
    'Amiri',
    'Scheherazade New',
    serif;
}

/* BETTER ARABIC SPACING */
.hero-subtitle,
.islamic-text,
.sheikh-card p,
.ayah{
  line-height: 2.1;
}

/* AYAH CENTER */
.ayah-box{
  text-align:center;
}

.ayah{
  text-align:center;
}


/* ===== MINI AYAHS ===== */

.mini-ayahs{
  display:grid;

  grid-template-columns:
  repeat(auto-fit,minmax(220px,1fr));

  gap:1rem;

  margin-top:2rem;
}


.mini-ayah{
  background:#ffffff;

  border:
  1px solid rgba(212,175,55,.18);

  padding:1.2rem;

  border-radius:1rem;

  transition:.35s ease;

  backdrop-filter:blur(4px);
}

.mini-ayah:hover{
  transform:translateY(-5px);

  border-color:
  rgba(212,175,55,.4);

  box-shadow:
  0 15px 35px rgba(0,0,0,.22);
}

.mini-ayah p{

  color:#1B120B;

  font-size:1.2rem;

  line-height:2;

  margin-bottom:.7rem;

  font-family:
  'Amiri',
  'Scheherazade New',
  serif;
}

.mini-ayah span{
  color:#D4AF37;
  font-weight:700;
}



/* ===== AYAH PREMIUM GLOW ===== */

.ayah-box{
  position:relative;
  overflow:hidden;
}

.ayah-box::before{
  content:"";

  position:absolute;

  width:320px;
  height:320px;

  background:
  radial-gradient(
    circle,
    rgba(212,175,55,.14),
    transparent 70%
  );

  top:-120px;
  right:-80px;

  pointer-events:none;
}

.ayah-box::after{
  content:"";

  position:absolute;

  width:240px;
  height:240px;

  background:
  radial-gradient(
    circle,
    rgba(255,255,255,.05),
    transparent 70%
  );

  bottom:-100px;
  left:-80px;

  pointer-events:none;
}

      `}</style>
    </div>
  );
};

export default About;
