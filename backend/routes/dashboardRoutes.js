import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const API = `${import.meta.env.VITE_API_URL}/api/dashboard`;

  const [stats, setStats] = useState({
    totalTafsiir: 0,
    totalLectures: 0,
    totalBooks: 0,
    totalJuz: 0,
  });

  const [loaded, setLoaded] = useState(false);
  const [counts, setCounts] = useState({
    totalTafsiir: 0,
    totalLectures: 0,
    totalBooks: 0,
    totalJuz: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const keys = Object.keys(stats);
    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const updated = {};
      keys.forEach((k) => {
        updated[k] = Math.round(stats[k] * eased);
      });
      setCounts(updated);
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [loaded, stats]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(API);
      if (res.data.success) {
        setStats(res.data.stats);
        setLoaded(true);
      }
    } catch (error) {
      console.log(error);
      setLoaded(true);
    }
  };

  const cards = [
    {
      key: "totalTafsiir",
      label: "Dhammaan Tafsiirka",
      sublabel: "Tafsiirada la duubay",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="13" y2="13" />
        </svg>
      ),
      accent: "#C9A84C",
      glow: "rgba(201,168,76,0.18)",
      bg: "linear-gradient(135deg, #fffaf0 0%, #fef3d0 100%)",
      border: "rgba(201,168,76,0.35)",
      iconBg: "rgba(201,168,76,0.15)",
      iconColor: "#9A7A20",
      tag: "Qur'aanka",
      tagBg: "rgba(201,168,76,0.12)",
      tagColor: "#7A5F10",
    },
    {
      key: "totalLectures",
      label: "Dhammaan Muxaadarada",
      sublabel: "Muxaadarada la diiwaan geliyey",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      ),
      accent: "#2563EB",
      glow: "rgba(37,99,235,0.15)",
      bg: "linear-gradient(135deg, #f0f6ff 0%, #dbeafe 100%)",
      border: "rgba(37,99,235,0.25)",
      iconBg: "rgba(37,99,235,0.12)",
      iconColor: "#1D4ED8",
      tag: "Codadka",
      tagBg: "rgba(37,99,235,0.1)",
      tagColor: "#1E40AF",
    },
    {
      key: "totalBooks",
      label: "Dhammaan Kutubta",
      sublabel: "Buugaagta la kaydiyey",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      accent: "#059669",
      glow: "rgba(5,150,105,0.15)",
      bg: "linear-gradient(135deg, #f0fdf8 0%, #d1fae5 100%)",
      border: "rgba(5,150,105,0.25)",
      iconBg: "rgba(5,150,105,0.12)",
      iconColor: "#047857",
      tag: "Maktabadda",
      tagBg: "rgba(5,150,105,0.1)",
      tagColor: "#065F46",
    },
    {
      key: "totalJuz",
      label: "Dhammaan Ajzaaca",
      sublabel: "Ajzaaca la duubay",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
        </svg>
      ),
      accent: "#7C3AED",
      glow: "rgba(124,58,237,0.15)",
      bg: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)",
      border: "rgba(124,58,237,0.25)",
      iconBg: "rgba(124,58,237,0.12)",
      iconColor: "#6D28D9",
      tag: "Juz'ada",
      tagBg: "rgba(124,58,237,0.1)",
      tagColor: "#5B21B6",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700;800&display=swap');

        .dash-root {
          font-family: 'Cairo', 'Segoe UI', sans-serif;
          padding: clamp(1rem, 3vw, 2rem);
          background: linear-gradient(160deg, #fdfaf4 0%, #f8f4ee 50%, #f2ede4 100%);
          min-height: 100vh;
        }

        .dash-header {
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1.5px solid rgba(201,168,76,0.2);
          position: relative;
        }

        .dash-header::after {
          content: '';
          position: absolute;
          bottom: -1.5px;
          left: 0;
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          border-radius: 2px;
        }

        .dash-bismillah {
          font-family: 'Amiri', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: #C9A84C;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: block;
          direction: rtl;
        }

        .dash-title {
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          font-weight: 800;
          color: #1a1209;
          margin: 0 0 0.4rem 0;
          line-height: 1.2;
        }

        .dash-title span {
          color: #C9A84C;
        }

        .dash-subtitle {
          font-size: 0.9rem;
          color: #7a6a54;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dash-subtitle::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .dash-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: clamp(0.8rem, 2vw, 1.4rem);
        }

        .dash-card {
          border-radius: 20px;
          padding: clamp(1.2rem, 2.5vw, 1.8rem);
          border: 1.5px solid;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          animation: fadeUp 0.5s ease both;
        }

        .dash-card:hover {
          transform: translateY(-6px);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .dash-card:nth-child(1) { animation-delay: 0.05s; }
        .dash-card:nth-child(2) { animation-delay: 0.12s; }
        .dash-card:nth-child(3) { animation-delay: 0.19s; }
        .dash-card:nth-child(4) { animation-delay: 0.26s; }

        .dash-card::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          opacity: 0.5;
          transition: opacity 0.25s;
        }

        .dash-card:hover::before {
          opacity: 0.85;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.2rem;
        }

        .card-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .card-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-value {
          font-size: clamp(2.2rem, 5vw, 3rem);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.35rem;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }

        .card-label {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          color: #1a1209;
        }

        .card-sublabel {
          font-size: 0.78rem;
          color: #8a7a64;
        }

        .card-bar {
          margin-top: 1.2rem;
          height: 4px;
          border-radius: 4px;
          background: rgba(0,0,0,0.07);
          overflow: hidden;
        }

        .card-bar-fill {
          height: 100%;
          border-radius: 4px;
          width: 65%;
          animation: barGrow 1s 0.5s ease both;
          transform-origin: left;
        }

        @keyframes barGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .dash-footer {
          margin-top: 2.5rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(0,0,0,0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .dash-footer-text {
          font-size: 0.78rem;
          color: #a09080;
        }

        .dash-total-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #7A5F10;
        }

        @media (max-width: 480px) {
          .dash-grid {
            grid-template-columns: 1fr;
          }
          .card-value {
            font-size: 2.4rem;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .dash-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <section className="dash-root">
        {/* HEADER */}
        <div className="dash-header">
          <span className="dash-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
          <h1 className="dash-title">
            Ku soo dhowow{" "}
            <span>Admin Dashboard-ka</span>
          </h1>
          <p className="dash-subtitle">Nidaamka online — waxaad ka arki kartaa xogta manta</p>
        </div>

        {/* CARDS GRID */}
        <div className="dash-grid">
          {cards.map((card) => (
            <div
              key={card.key}
              className="dash-card"
              style={{
                background: card.bg,
                borderColor: card.border,
                boxShadow: `0 8px 32px ${card.glow}`,
              }}
            >
              {/* Decorative circle */}
              <div
                className="dash-card-circle"
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 130,
                  height: 130,
                  borderRadius: "50%",
                  background: card.glow,
                  pointerEvents: "none",
                }}
              />

              {/* Top row */}
              <div className="card-top">
                <div
                  className="card-icon"
                  style={{ background: card.iconBg, color: card.iconColor }}
                >
                  {card.icon}
                </div>
                <span
                  className="card-tag"
                  style={{ background: card.tagBg, color: card.tagColor }}
                >
                  {card.tag}
                </span>
              </div>

              {/* Value */}
              <div className="card-value" style={{ color: card.accent }}>
                {counts[card.key].toLocaleString()}
              </div>

              {/* Labels */}
              <div className="card-label">{card.label}</div>
              <div className="card-sublabel">{card.sublabel}</div>

              {/* Progress bar */}
              <div className="card-bar">
                <div
                  className="card-bar-fill"
                  style={{ background: `linear-gradient(90deg, ${card.accent}, ${card.accent}88)` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="dash-footer">
          <span className="dash-footer-text">
            Waxaa la cusbooneysiiyey:{" "}
            {new Date().toLocaleDateString("so-SO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div className="dash-total-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Wadarta:{" "}
            {(
              (counts.totalTafsiir || 0) +
              (counts.totalLectures || 0) +
              (counts.totalBooks || 0) +
              (counts.totalJuz || 0)
            ).toLocaleString()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
