import React, { useState } from "react";
import heroImg from "../assets/contantheropicture.jpg";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
const fadeIn = { animation: "fadeIn 1.8s ease" };
const slideUp = { animation: "slideUp 1.4s ease" };

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    await emailjs.send(
      "service_9tdctoo",
      "template_xmooapj",
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      "CWyJ_tB3o-l40-vEA"
    );

 Swal.fire({
  icon: "success",
  title: "Waad Mahadsan Tahay 🤍",
  text: "Fariintaada si guul leh ayaa loo diray.",
  confirmButtonColor: "#D4AF37",
  background: "#FFF8F3",
  color: "#2C1810",
});

  } catch (error) {

    console.log(error);

Swal.fire({
  icon: "error",
  title: "Qalad dhacay",
  text: "Fariinta lama diri karin.",
  confirmButtonColor: "#932F2F",
  background: "#FFF8F3",
  color: "#2C1810",
});
  }
};

  return (
    <div
      style={{
        background: "#FFF8F3",
        minHeight: "100vh",
      }}
    >

      {/* HERO */}
      <section
        style={{
          padding: "5rem 1rem",
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          minHeight: "45vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >

        {/* DARK OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(0,0,0,.72),rgba(0,0,0,.72))",
          }}
        />

        {/* GOLD GLOW */}
        <div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            background:
              "radial-gradient(circle, rgba(212,175,55,.18), transparent 70%)",
            top: "-120px",
            right: "-80px",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            ...fadeIn,
          }}
        >

          <h1
            style={{
              fontSize: "clamp(2.5rem,5vw,4rem)",
              fontWeight: 900,
              color: "#FFD95A",

              textShadow:
                "0 0 20px rgba(212,175,55,.35), 0 4px 18px rgba(0,0,0,.9)",

              letterSpacing: "-1px",
            }}
          >
            📩 Nala Soo Xiriir
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              marginTop: "1rem",
              maxWidth: "720px",
              marginInline: "auto",
              lineHeight: "2",
              color: "#FFF8F3",
            }}
          >
            Haddii aad qabto su’aalo, talooyin,
            ama aad doonayso taageero,
            si xor ah noola soo xiriir.
          </p>

        </div>
      </section>

      {/* MAIN */}
      <section
        style={{
          maxWidth: "1150px",
          margin: "2rem auto",
          padding: "1rem",
          ...slideUp,
        }}
      >

        {/* CONTACT CARDS */}
        <div
          style={{
            display: "grid",
            gap: "1.5rem",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",

            marginBottom: "2rem",
          }}
        >

          {/* MOBILE */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            <h3 style={cardTitle}>
              📞 Mobile
            </h3>

            <p style={cardText}>
              +252 634961693
            </p>
          </div>

          {/* EMAIL */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            <h3 style={cardTitle}>
              📧 Email
            </h3>

            <p style={cardText}>
              shabdinasir@gmail.com
            </p>
          </div>

          {/* WHATSAPP */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            <h3 style={cardTitle}>
              💬 WhatsApp
            </h3>

            <p style={cardText}>
              +252 634961693
            </p>
          </div>

          {/* LOCATION */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            <h3 style={cardTitle}>
              📍 Goobta
            </h3>

            <p style={cardText}>
              Laascaanood — Soomaaliya
            </p>
          </div>

        </div>

        {/* FORM */}
        <div
          style={{
            background: "#ffffff",
            padding: "2rem",
            borderRadius: "1.5rem",

            boxShadow:
              "0 18px 40px rgba(0,0,0,.12)",

            border:
              "1px solid rgba(212,175,55,.2)",
          }}
        >

          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "#2C1810",
              marginBottom: "1.5rem",
            }}
          >
            ✍️ U Soo Dir Fariin
          </h2>

          <form onSubmit={handleSubmit}>

            <label style={labelStyle}>
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Magacaaga..."
            />

            <label style={labelStyle}>
              Email
            </label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              style={inputStyle}
              placeholder="hamze@gmail.com"
            />

            <label style={labelStyle}>
              Message
            </label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              style={{
                ...inputStyle,
                resize: "none",
              }}
              placeholder="Fariintaada halkan ku qor..."
            />

            <button
              type="submit"
              style={{
                marginTop: "1.2rem",
                width: "100%",
                padding: "14px",

                borderRadius: "14px",

                background:
                  "linear-gradient(135deg,#F5D76E,#D4AF37)",

                color: "#2C1810",

                fontSize: "1rem",
                fontWeight: 800,

                border: "none",

                cursor: "pointer",

                transition: ".35s ease",

                boxShadow:
                  "0 10px 25px rgba(212,175,55,.35)",
              }}
            >
              ➤ Dir Fariinta
            </button>

          </form>
        </div>

        {/* QURAN SECTION */}
        <div
          style={{
            marginTop: "2.5rem",

            background:
              "linear-gradient(135deg,#2C1810,#1A0F0A)",

            borderRadius: "1.8rem",

            padding: "2.5rem 1.5rem",

            textAlign: "center",

            boxShadow:
              "0 20px 50px rgba(0,0,0,.25)",

            position: "relative",

            overflow: "hidden",
          }}
        >

          <div
            style={{
              position: "absolute",

              width: "300px",
              height: "300px",

              background:
                "radial-gradient(circle, rgba(212,175,55,.14), transparent 70%)",

              top: "-120px",
              right: "-80px",
            }}
          />

          <h2
            style={{
              color: "#FFD95A",

              fontSize: "1.9rem",

              marginBottom: "1.5rem",

              fontWeight: 900,
            }}
          >
            ✨ آيات من القرآن الكريم
          </h2>

          <p
            style={{
              color: "#FFF8F3",

              fontSize: "1.9rem",

              lineHeight: "2.3",

              fontFamily: "'Amiri', serif",

              direction: "rtl",
            }}
          >
            ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
          </p>

          <span
            style={{
              color: "#D4AF37",

              fontWeight: 700,

              display: "block",

              marginTop: ".8rem",
            }}
          >
            سورة طه — 114
          </span>

        </div>

      </section>

      {/* STYLES */}
      <style>
        {`
          @keyframes fadeIn{
            from{
              opacity:0;
            }

            to{
              opacity:1;
            }
          }

          @keyframes slideUp{
            from{
              transform:translateY(30px);
              opacity:0;
            }

            to{
              transform:translateY(0);
              opacity:1;
            }
          }

          input:focus,
          textarea:focus{
            outline:none;

            border-color:#D4AF37;

            box-shadow:
            0 0 0 4px rgba(212,175,55,.15);
          }

          button:hover{
            transform:translateY(-3px);

            box-shadow:
            0 18px 35px rgba(212,175,55,.35);
          }

          @media(max-width:768px){

            .contact-grid{
              grid-template-columns:1fr;
            }

          }
        `}
      </style>

    </div>
  );
};

/* CARD STYLE */
const cardStyle = {
  background: "#ffffff",

  padding: "1.7rem",

  borderRadius: "1.2rem",

  boxShadow:
    "0 15px 35px rgba(0,0,0,.08)",

  borderTop:
    "4px solid #D4AF37",

  transition: ".35s ease",

  backdropFilter: "blur(10px)",
};

/* CARD TITLE */
const cardTitle = {
  fontSize: "1.2rem",
  fontWeight: 800,
  color: "#2C1810",
};

/* CARD TEXT */
const cardText = {
  marginTop: ".7rem",
  color: "#4B5563",
  lineHeight: "1.7",
};

/* LABEL */
const labelStyle = {
  display: "block",

  fontWeight: 700,

  color: "#2C1810",

  marginBottom: "6px",

  marginTop: "14px",
};

/* INPUT */
const inputStyle = {
  width: "100%",

  padding: "14px",

  borderRadius: "12px",

  border:
    "2px solid rgba(212,175,55,.45)",

  background: "#FFF8F3",

  fontSize: "1rem",

  transition: ".3s ease",
};

export default ContactUs;