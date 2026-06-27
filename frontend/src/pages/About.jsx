import React from "react";

import sheikhImg from "../assets/shiikhcabdinasir.jpeg";
import "./About.css";
import {
  FaMosque,
  FaQuran,
  FaBookOpen,
  FaHeadphones,
  FaVideo
} from "react-icons/fa";





const About = () => {
  return (
 <div className="about-page">

    


<section className="about-hero">

  <div className="hero-content">

    <h1 className="hero-title">
      منصة تفسير القرآن الكريم
    </h1>

    <p className="hero-subtitle">
      منصة إسلامية متخصصة في تفسير القرآن الكريم
      ودروس ومحاضرات الشيخ عبد الناصر حاجي أحمد
      بطريقة عصرية وسهلة الاستخدام.
    </p>

  </div>

</section>

      {/* ================= CONTENT ================= */}
      
      <section className="about-container">

        {/* BLOCK 1 */}
   {/* BLOCK 1 */}
<div className="about-card premium-card">

  <div className="card-badge">
    🕌
  </div>

  <h2 className="about-title">
    ما هي هذه المنصة؟
  </h2>

  <p className="about-desc">
    هذه المنصة مخصصة لنشر
    <b> تفسير القرآن الكريم </b>
    بأسلوب حديث ومنظم يساعد المسلم
    على الوصول إلى العلم بسهولة،
    والاستماع إلى الدروس والمحاضرات
    في أي وقت.
  </p>

  <div className="about-grid">

    <div className="about-item">
      📖 تقسيم القرآن إلى 30 جزءًا
    </div>

    <div className="about-item">
      📘 عرض السور مرتبة
    </div>

    <div className="about-item">
      🎧 تفسير صوتي
    </div>

    <div className="about-item">
      🎥 محاضرات مرئية
    </div>

  </div>



        
        </div>
        <div className="section-divider">
  🕌 ✦ 🕌
</div>

        {/* BLOCK 2 */}
        <div className="about-card gold">
          <h2 className="about-title">
             ماذا تقدم المنصة؟
          </h2>



          <div className="features">

          <div className="features">

  <div className="feature">
    <div className="feature-icon">🎧</div>
    <h3>تفسير صوتي</h3>
    <p>استمع إلى تفسير القرآن الكريم بجودة عالية.</p>
  </div>

  <div className="feature">
    <div className="feature-icon">🎥</div>
    <h3>محاضرات مرئية</h3>
    <p>شاهد الدروس والمحاضرات الإسلامية بسهولة.</p>
  </div>

  <div className="feature">
    <div className="feature-icon">🔍</div>
    <h3>بحث سريع</h3>
    <p>اعثر على السورة أو الجزء خلال ثوانٍ.</p>
  </div>

  <div className="feature">
    <div className="feature-icon">📱</div>
    <h3>جميع الأجهزة</h3>
    <p>يعمل على الهاتف والكمبيوتر والتابلت.</p>
  </div>

  <div className="feature">
    <div className="feature-icon">💾</div>
    <h3>المفضلة</h3>
    <p>احفظ الدروس واستمع إليها لاحقًا.</p>
  </div>

  <div className="feature">
    <div className="feature-icon">🌍</div>
    <h3>متاح للجميع</h3>
    <p>منصة مجانية لجميع المسلمين حول العالم.</p>
  </div>

</div>
          </div>
        </div>
        <div className="section-divider">
  🕌 ✦ 🕌
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


<div className="section-divider">
  🕌 ✦ 🕌
</div>

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
        <div className="section-divider">
  🕌 ✦ 🕌
</div>

        <div className="ayah-box">
          <p className="ayah">
            ﴿ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ
            لِيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُو الْأَلْبَابِ ﴾
          </p>
          <span>سورة ص —   29</span>



          <div className="mini-ayahs">

  <div className="mini-ayah">     
    <p>﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾</p>
    <span>طه — 114</span>
  </div>

  <div className="mini-ayah">
    
  <p>﴿  وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ  ﴾</p>

        <span>56 — الذاريات</span>

  </div>

  <div className="mini-ayah">
    <p>﴿ فَاذْكُرُونِي أَذْكُرْكُمْ ﴾</p>
    <span>البقرة — 152</span>
  </div>

</div>
        </div>

      </section>

    
    </div>
  );
};

export default About;
