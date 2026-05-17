import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

const Dashboard = () => {

  const API =
  `${import.meta.env.VITE_API_URL}/api/dashboard`;

  const [stats,setStats] =
  useState({

    totalTafsiir:0,
    totalLectures:0,
    totalBooks:0,
    totalJuz:0,

  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
  async () => {

    try {

      const res =
      await axios.get(API);

      if(res.data.success){

        setStats(
          res.data.stats
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <section className="p-4 sm:p-6">

      <div className="mb-8">

        <h1
          style={{
            fontSize:"1.9rem",
            fontWeight:700,
            color:"#2C1810",
          }}
        >
          Ku soo dhowow Admin Dashboard-ka
        </h1>

        <p
          style={{
            marginTop:"0.5rem",
            color:"#666",
          }}
        >
          your info..
        </p>

      </div>

      {/* GRID */}
      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(230px,1fr))",
          gap:"1.2rem",
        }}
      >

        {/* TAFSIIR */}
        <div style={goldBox}>

          <div style={titleStyle}>
            📖DHammaan tafsiirka
          </div>

          <div style={valueStyle}>
            {stats.totalTafsiir}
          </div>

        </div>

        {/* LECTURES */}
        <div style={blueBox}>

          <div style={titleStyle}>
            🎤 dhammaan  Muxaadaro
          </div>

          <div style={valueStyle}>
            {stats.totalLectures}
          </div>

        </div>

        {/* BOOKS */}
        <div style={greenBox}>

          <div style={titleStyle}>
            📚 dhammaan  Kutubta
          </div>

          <div style={valueStyle}>
            {stats.totalBooks}
          </div>

        </div>

        {/* JUZ */}
        <div style={redBox}>

          <div style={titleStyle}>
            🕌 dhammaan  Jus
          </div>

          <div style={valueStyle}>
            {stats.totalJuz}
          </div>

        </div>

      </div>

    </section>
  );
};

/* ===== COMMON ===== */

const titleStyle = {
  fontSize:"1rem",
  fontWeight:600,
  marginBottom:"1rem",
};

const valueStyle = {
  fontSize:"2.3rem",
  fontWeight:800,
};

/* ===== BOXES ===== */

const goldBox = {
  background:"#F5E6E0",
  borderLeft:"6px solid #D4AF37",
  padding:"1.5rem",
  borderRadius:"1rem",
  boxShadow:
  "0 10px 25px rgba(0,0,0,0.08)",
};

const blueBox = {
  ...goldBox,
  background:"#EFF6FF",
  borderLeft:"6px solid #2563EB",
};

const greenBox = {
  ...goldBox,
  background:"#F0FDF4",
  borderLeft:"6px solid #10B981",
};

const redBox = {
  ...goldBox,
  background:"#FEF2F2",
  borderLeft:"6px solid #DC2626",
};

export default Dashboard;