import React, { useState } from "react";



import axios from "axios";
import "./Contact.css";
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

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/contact`,
      form
    );

    if (res.data.success) {

     Swal.fire({
  icon: "success",
  title: "Waad Mahadsan Tahay",
  text: "Fariintaada si guul ah ayaa loo diray.",
  width: 320,
  padding: "1.2em",
  confirmButtonText: "OK",
});

      setForm({
        name: "",
        email: "",
        message: "",
      });
    }

  }
  catch (error) {

  let errorMessage = "Message could not be sent.";

  if (!navigator.onLine) {
    errorMessage =
      "No internet connection. Please check your network.";
  }

  else if (error.code === "ERR_NETWORK") {
    errorMessage =
      "Unable to connect. Please try again.";
  }

  else if (error.response?.data?.message) {
    errorMessage =
      error.response.data.message;
  }

  Swal.fire({
    icon: "error",
    title: "Error",
    text: errorMessage,
  });

  console.log(error);
}
};

  return (
 <div className="contact-page">

      {/* HERO */}
  <section className="contact-hero">

        {/* DARK OVERLAY */}
    
    <div className="contact-overlay" />

        {/* GOLD GLOW */}
     

     <div className="contact-glow" />

     
     <div
  className="contact-hero-content"
  style={fadeIn}
>

        <h1 className="contact-title">
  Nala Soo xidhiidh
</h1>

      <p className="contact-subtitle">
            Haddii aad qabto su’aalo, aad nooo waddo talooyin
            ama aad doonayso caawimo  nala soo xidhiidh.
          </p>

        </div>
      </section>

      {/* MAIN */}
 
 <section className="contact-container" style={slideUp}>

        {/* CONTACT CARDS */}
    
<div className="contact-grid">

  <div className="contact-card">
    <div className="contact-icon">📞</div>
    <h3>Mobile</h3>
    <p>+252 634961693</p>
  </div>

  <div className="contact-card">
    <div className="contact-icon">📧</div>
    <h3>Email</h3>
    <p>shcabdinaasir12@gmail.com</p>
  </div>

  <div className="contact-card">
    <div className="contact-icon">💬</div>
    <h3>WhatsApp</h3>
    <p>+252 634961693</p>
  </div>

  <div className="contact-card">
    <div className="contact-icon">📍</div>
    <h3>Goobta</h3>
    <p>Laascaanood — Soomaaliya</p>
  </div>

</div>

        {/* FORM */}
      
      <div className="contact-form">

     <h2 className="contact-form-title">
            ✍️ halkan nuugu Soo Dir Fariintaada
          </h2>

          <form onSubmit={handleSubmit}>

         <label className="contact-label">   
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            className="contact-input"
              placeholder="Magacaaga..."
            />
<label className="contact-label">
              Email
            </label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
         className="contact-input"
              placeholder="shcabdinaasir12@gmail.com"
            />

           <label className="contact-label">
              Message
            </label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"

       className="contact-input contact-textarea"
              placeholder="Fariintaada halkan ku qor..."
            />

          <button
  type="submit"
  className="contact-btn"
>
              ➤ Dir Fariinta
            </button>

          </form>
        </div>

        {/* QURAN SECTION */}
        <div className="contact-ayah">

         

        <h2 className="contact-ayah-title">
  ✨ آيات من القرآن الكريم
</h2>

<p className="contact-ayah-text">
  ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
</p>

<span className="contact-ayah-ref">
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




export default ContactUs;