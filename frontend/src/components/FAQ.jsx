import { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";

const faqs = [
  {
    q: "Maxaan ka helayaa rugtan?",
    a: (
      <>
        Rugtan waxaad ka helaysaa <b>tafsiirka Qur'aanka Kariimka</b>,
        <b> muxaadarooyin</b> iyo <b>kutub </b> uu akhriyey
        Shiikh Cabdinaasir Xaaji Axmed.
      </>
    ),
  },
  {
    q: "Wax kharash ah miyaa igaga baxaya?",
    a: (
      <>
        Maya, waa wx kasta oo halkan ku jira <b>bilaash</b> waxaana  loogu talagalay in muslimiinta somaliyeed ay  ka
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
    q: "halkee ka daalacdaa tafsiiirka Qur’aanka?",
    a: (
      <>
        booqo lifaaqa hoose si aad u daalacato tafsiiirka Qur’aanka Kariimka:
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
              <div className="faq-answer">
                {item.a}
              </div>
            )}

          </div>
        ))}
      </div>

    </section>
  );
};

export default FAQ;