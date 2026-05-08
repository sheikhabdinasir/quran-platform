import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#2C1810",
        color: "#FFF8F3",
        padding: "1.6rem 1rem",   // 🌟 SIZE KA YARAADAY
        marginTop: "2rem",
        borderTop: "3px solid #D4AF37",
        animation: "fadeUp 1.1s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",  // 🌟 GAP-KA YARAADAY
        }}
      >
        {/* TITLE */}
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              fontSize: "1.3rem", // 🌟 TITLE Size Yaraaday
              fontWeight: "800",
              color: "#D4AF37",
              marginBottom: "0.3rem",
            }}
          >
            Tafsiirka Qur'aanka Kariimka
          </h3>

          <p
            style={{
              opacity: 0.9,
              maxWidth: "620px",
              margin: "auto",
              fontSize: "0.85rem",  // 🌟 DESCRIPTION Size yar
            }}
          >
            Waxaad ka dhageysan kartaa tafsiirka Qur'aanka adigoo dooranaya muuqaal
            ama audio, kuna raaxaysanaya interface casri ah oo sahlan.
          </p>
        </div>

        {/* MENU LINKS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",   // 🌟 Smaller spacing
          }}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/tafsiirka", label: "Tafsiirka" },
            { to: "/lectures", label: "Muxaadarooyin" },
            { to: "/suurah", label: "Suurado" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              style={{
                color: "#FFF8F3",
                textDecoration: "none",
                fontSize: "0.9rem",  // 🌟 Smaller menu font
                transition: "0.25s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#D4AF37")}
              onMouseLeave={(e) => (e.target.style.color = "#FFF8F3")}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.9rem", // 🌟 Icons tighter spacing
          }}
        >
          {[FaFacebookF, FaYoutube, FaInstagram, FaTiktok].map((Icon, i) => (
            <div
              key={i}
              style={{
                background: "#D4AF37",
                padding: "8px",        // 🌟 Smaller icon bubbles
                borderRadius: "50%",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.12)";
                e.target.style.boxShadow = "0 0 10px #D4AF37";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              <Icon size={15} color="#2C1810" /> {/* 🌟 Smaller icon */}
            </div>
          ))}
        </div>

        {/* COPYRIGHT */}
        <p
          style={{
            textAlign: "center",
            opacity: 0.8,
            fontSize: "0.8rem",  // 🌟 Small copyright text
            marginTop: "0.5rem",
          }}
        >
          © {new Date().getFullYear()} Tafsiir Qur'aanka • All Rights Reserved.
        </p>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
