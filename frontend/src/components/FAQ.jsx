import { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";

const faqs = [
  {
    q: "Maxaan ka helayaa rugtan?",
    a: (
      <>
        Rugtan waxaad ka helaysaa <b>tafsiirka Qur'aanka Kariimka</b>,
        <b> muxaadarooyin</b> iyo <b>dardaaranno</b> uu ka duubay
        Shiikh Cabdinaasir Xaaji Axmed.
      </>
    ),
  },
  {
    q: "Wax kharash ah miyaa igaga baxaya?",
    a: (
      <>
        Maya, waa <b>bilaash</b> oo loogu talagalay in muslimiintu ka
        faa’iidaystaan cilmiga shiikha.
      </>
    ),
  },
  {
    q: "Ma jiraan kutub uu shiikhu akhriyey?",
    a: (
      <>
        Haa, waxaa halkan kuugu diyaarsan kutub badan sida:
        <b> Saxiixul Muslim</b>, <b>Saxiixul Bukhaari</b>,
        iyo kutub fiqhi ah oo kala duwan.
        <br />
        👉 Booqo halkan: <Link to="/kutub">Kutub</Link>
      </>
    ),
  },
  {
    q: "Sidee ku heli karaa kutubta uu duubay shiikhu?",
    a: (
      <>
        Waxaad si fudud ku geli kartaa adoo booqanaya:
        <br />
        👉 <Link to="/kutub">Bogga Kutubta</Link>
      </>
    ),
  },
  {
    q: "Sidee ku heli karaa muxaadarooyinka?",
    a: (
      <>
        Muxaadarooyinka shiikha waxaad ka heli kartaa halkan:
        <br />
        👉 <Link to="/lectures">Muxaadarooyin</Link>
      </>
    ),
  },
  {
    q: "Sidee ku geli karaa tafsiirka Qur’aanka?",
    a: (
      <>
        Tafsiirka Qur’aanka Kariimka waxaad ka heli kartaa halkan:
        <br />
        👉 <Link to="/tafsiir-audio">Tafsiirka</Link>
      </>
    ),
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section">
<h2 className="faq-title">
  <span>Weydiimo iyo War-celinno</span>
</h2>
      <div className="faq-list">
        {faqs.map((item, i) => (
          <div key={i} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span>{item.q}</span>
              <span className="icon">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>

            {openIndex === i && (
              <div className="faq-answer">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
