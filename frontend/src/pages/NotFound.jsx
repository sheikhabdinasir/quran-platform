import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section style={styles.wrap}>
      <div style={styles.glow}></div>

      <div style={styles.card}>
        <div style={styles.icon}>⚠</div>

        <div style={styles.code}>404</div>

        <h1 style={styles.title}>
          Lama Helin Boggaan
        </h1>

        <p style={styles.text}>
          Bogga aad raadineyso ma jiro ama waa la
          beddelay.
        </p>

        <Link to="/" style={styles.btn}>
          ⬅ Ku Noqo Home
        </Link>
      </div>
    </section>
  );
};

const styles = {
  wrap: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    background:
      "linear-gradient(135deg,#FFF8F3,#F5E6E0)",
    position: "relative",
    overflow: "hidden"
  },

  glow: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(212,175,55,.18)",
    borderRadius: "50%",
    filter: "blur(90px)"
  },

  card: {
    position: "relative",
    background:
      "linear-gradient(180deg,#ffffff,#fffaf7)",
    padding: "3.5rem 2.5rem",
    borderRadius: "30px",
    textAlign: "center",
    maxWidth: "520px",
    width: "100%",
    border: "1px solid rgba(212,175,55,.25)",
    boxShadow:
      "0 25px 60px rgba(0,0,0,.12)",
    backdropFilter: "blur(10px)",
    animation: "float 4s ease-in-out infinite"
  },

  icon: {
    width: "75px",
    height: "75px",
    margin: "0 auto 1.2rem",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#D4AF37,#f4d76f)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    color: "#2C1810",
    boxShadow:
      "0 10px 30px rgba(212,175,55,.35)"
  },

  code: {
    fontSize: "6rem",
    fontWeight: "900",
    background:
      "linear-gradient(135deg,#D4AF37,#b8860b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: "1",
    letterSpacing: "3px"
  },

  title: {
    fontSize: "2.2rem",
    marginTop: "1rem",
    color: "#2C1810",
    fontWeight: "800"
  },

  text: {
    marginTop: "1rem",
    fontSize: "1.05rem",
    color: "#666",
    lineHeight: "1.8",
    maxWidth: "360px",
    marginInline: "auto"
  },

  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".5rem",
    marginTop: "2rem",
    padding: "1rem 1.8rem",
    borderRadius: "999px",
    background:
      "linear-gradient(135deg,#D4AF37,#f0c94d)",
    color: "#2C1810",
    fontWeight: "800",
    textDecoration: "none",
    fontSize: "1rem",
    boxShadow:
      "0 10px 25px rgba(212,175,55,.35)",
    transition: "all .3s ease"
  }
};

export default NotFound;