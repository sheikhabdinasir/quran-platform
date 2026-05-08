import React, { useState } from "react";
import heroImg from "../assets/contantheropicture.jpg";


const fadeIn = { animation: "fadeIn 1.8s ease" };
const slideUp = { animation: "slideUp 1.4s ease" };

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🙏 Mahadsanid! Fariintaada waa la helay.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ background: "#FFF8F3", minHeight: "100vh" }}>
      {/* HEADER BACKGROUND IMAGE */}
     
     
     <section
  style={{
    padding: "4rem 1rem",
    backgroundImage: `url(${heroImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    minHeight: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
  }}
>


        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 10, ...fadeIn }}>
          <h1
            style={{
              fontSize: "2.6rem",
              fontWeight: 800,
              textShadow: "0px 4px 12px rgba(0,0,0,0.9)",
            }}
          >
            📩 Nala Soo Xiriir
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              marginTop: "0.7rem",
              maxWidth: "700px",
              margin: "auto",
              lineHeight: "1.6",
            }}
          >
            Haddii aad qabto su’aalo, talooyin ama taageero, fariin noo reeb.
          </p>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "2rem auto",
          padding: "1rem",
          ...slideUp,
        }}
      >
        {/* Contact Info Cards */}
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            marginBottom: "2rem",
          }}
        >
          {/* Phone Card */}
          <div
            style={{
              background: "white",
              padding: "1.6rem",
              borderRadius: "1rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              borderLeft: "6px solid #D4AF37",
            }}
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2C1810" }}>
              📞 Mobile
            </h3>
            <p style={{ marginTop: "0.5rem", color: "#4B5563" }}>
              +252 634961693 
            </p>
          </div>

          {/* Email Card */}
          <div
            style={{
              background: "white",
              padding: "1.6rem",
              borderRadius: "1rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              borderLeft: "6px solid #932F2F",
            }}
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2C1810" }}>
              📧 Email
            </h3>
            <p style={{ marginTop: "0.5rem", color: "#4B5563" }}>
              shabdinasir@gmail.com
            </p>
          </div>

          {/* Location Card */}
          <div
            style={{
              background: "white",
              padding: "1.6rem",
              borderRadius: "1rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              borderLeft: "6px solid #2C1810",
            }}
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2C1810" }}>
             Goobta
            </h3>
            <p style={{ marginTop: "0.5rem", color: "#4B5563" }}>
              • lasanod  waqoooyi Bari somalia 
            </p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "1.2rem",
            boxShadow: "0 10px 35px rgba(0,0,0,0.09)",
          }}
        >
          <h2
            style={{
              fontSize: "1.7rem",
              fontWeight: 700,
              color: "#2C1810",
              marginBottom: "1.3rem",
            }}
          >
            ✍️ U Soo Dir Fariin
          </h2>

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Magacaaga..."
            />

            <label style={labelStyle}>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              style={inputStyle}
              placeholder="hamze@gmail.com"
            />

            <label style={labelStyle}>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              style={{ ...inputStyle, resize: "none" }}
              placeholder="Fariintaada halkan ku qor..."
            ></textarea>

            <button
              type="submit"
              style={{
                marginTop: "1rem",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                background: "#D4AF37",
                color: "#2C1810",
                fontSize: "1rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              ➤ Dir Fariinta
            </button>
          </form>
        </div>
      </section>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

/* SHARED STYLES */
const labelStyle = {
  display: "block",
  fontWeight: 600,
  color: "#2C1810",
  marginBottom: "6px",
  marginTop: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "2px solid #D4AF37",
  background: "#FFF8F3",
  fontSize: "1rem",
};

export default ContactUs;
