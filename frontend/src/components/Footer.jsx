import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background:
          "linear-gradient(180deg,#2C1810,#140B07)",
        color: "#FFF8F3",
        marginTop: "4rem",
        borderTop: "2px solid rgba(212,175,55,.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* GOLD GLOW */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(212,175,55,.12), transparent 70%)",
          top: "-120px",
          right: "-100px",
        }}
      />

      <div
        style={{
          maxWidth: "1250px",
          margin: "auto",
          padding: "4rem 1.5rem 2rem",
          position: "relative",
          zIndex: 2,
        }}
      >

        {/* TOP GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "2.5rem",
          }}
        >

          {/* BRAND */}
          <div>

            <h2
              style={{
                color: "#D4AF37",
                fontSize: "1.8rem",
                fontWeight: 900,
                marginBottom: "1rem",
              }}
            >
              Tafsiirka Qur'aanka
            </h2>

            <p
              style={{
                lineHeight: "1.9",
                opacity: 0.9,
                fontSize: ".95rem",
              }}
            >
              Rugtan waxaa loogu talo galay
              tafsiirka Qur’aanka Kariimka,
              muxaadarooyinka iyo kutubta uu akhriyey shiikh cabdinasir xaaji axmed.
            </p>

            {/* AYAH */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,.04)",
                border:
                  "1px solid rgba(212,175,55,.2)",
              }}
            >

              <p
                style={{
                  direction: "rtl",
                  fontSize: "1.4rem",
                  color: "#FFD95A",
                  fontFamily: "'Amiri', serif",
                  lineHeight: "2.2",
                }}
              >
                ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
              </p>

              <span
                style={{
                  color: "#D4AF37",
                  fontSize: ".9rem",
                }}
              >
                سورة طه — 114
              </span>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div>

            <h3
              style={{
                color: "#D4AF37",
                marginBottom: "1.2rem",
                fontSize: "1.2rem",
              }}
            >
              Quick Links
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".9rem",
              }}
            >

              {[
                { to: "/", label: "Home" },
                { to: "/tafsiir", label: "Tafsiir" },
                { to: "/kutub", label: "Kutub" },
                { to: "/lectures", label: "Lectures" },
                { to: "/contact", label: "Contact" },
                { to: "/about", label: "About Us" },
              ].map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  style={{
                    color: "#FFF8F3",
                    textDecoration: "none",
                    transition: ".3s ease",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#D4AF37";
                    e.target.style.transform =
                      "translateX(6px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#FFF8F3";
                    e.target.style.transform =
                      "translateX(0)";
                  }}
                >
                  ➜ {item.label}
                </Link>
              ))}

            </div>
          </div>

          {/* CONTACT */}
          <div>

            <h3
              style={{
                color: "#D4AF37",
                marginBottom: "1.2rem",
                fontSize: "1.2rem",
              }}
            >
              Contact Info
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >

              <div style={contactItem}>
                <FaPhoneAlt color="#D4AF37" />
                <span>+252 634961693</span>
              </div>

              <div style={contactItem}>
                <FaEnvelope color="#D4AF37" />
                <span>
                  shabdinasir@gmail.com
                </span>
              </div>

              <div style={contactItem}>
                <FaMapMarkerAlt color="#D4AF37" />
                <span>
                  Laascaanood — Soomaaliya
                </span>
              </div>

            </div>

            {/* SOCIALS */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1.8rem",
              }}
            >

              {[
                FaFacebookF,
                FaYoutube,
                FaInstagram,
                FaTiktok,
              ].map((Icon, i) => (
                <div
                  key={i}
                  style={{
                    width: "42px",
                    height: "42px",

                    borderRadius: "50%",

                    background:
                      "linear-gradient(135deg,#D4AF37,#F5D76E)",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    cursor: "pointer",

                    transition: ".35s ease",

                    color: "#2C1810",

                    boxShadow:
                      "0 8px 20px rgba(212,175,55,.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-5px) scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0) scale(1)";
                  }}
                >
                  <Icon size={17} />
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,rgba(212,175,55,.6),transparent)",
            margin: "3rem 0 1.5rem",
          }}
        />

        {/* COPYRIGHT */}
        <div
          style={{
            textAlign: "center",
          }}
        >

          <p
            style={{
              opacity: 0.8,
              fontSize: ".92rem",
            }}
          >
            © {new Date().getFullYear()} Tafsiirka Qur'aanka Kariimka •
            All Rights Reserved.
          </p>

          <p
            style={{
              marginTop: ".6rem",
              color: "#D4AF37",
              fontSize: ".9rem",
            }}
          >
نُوِّرَتْ هٰذِهِ الْمِنَصَّةُ لِنَشْرِ دِينِ الإِسْلَامِ وَعِلْمِ الشَّرِيعَةِ          </p>

        </div>

      </div>
    </footer>
  );
};

const contactItem = {
  display: "flex",
  alignItems: "center",
  gap: ".8rem",
  color: "#FFF8F3",
  opacity: 0.92,
};

export default Footer;