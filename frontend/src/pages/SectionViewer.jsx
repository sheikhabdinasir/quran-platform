// src/pages/SectionViewer.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const SectionViewer = () => {
  const { juz, surahNumber } = useParams();
  const location = useLocation();

  const filterType = location.state?.filterType || "audio"; // default audio
  const audioRef = useRef(null);

  const [sections, setSections] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    try {

      const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/dars/all`
);
      const list = res.data.data || [];

      // Filter data by Juz + Surah + Type
      const filtered = list
        .filter((d) => d.juz === Number(juz))
        .filter((d) => String(d.surahNumber) === String(surahNumber))
        .filter((d) => d.type === filterType)
        .filter((d) =>
          `${d.title} ${d.surah} ${d.juz}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .sort((a, b) => {
          if (a.sectionNumber && b.sectionNumber && a.sectionNumber !== b.sectionNumber)
            return a.sectionNumber - b.sectionNumber;
          return a.ayahFrom - b.ayahFrom;
        });

      setSections(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [juz, surahNumber, search, filterType]);

  // STOP AUDIO WHEN SWITCHING BETWEEN SECTIONS
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [sections]);

  const isYouTube = (url) =>
    url.includes("youtube.com") || url.includes("youtu.be");

  const convertToEmbed = (url) => {
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be")) return url.replace("youtu.be/", "www.youtube.com/embed/");
    return url;
  };

  if (loading) {
    return (
      <section className="section">
        <p>Loading sections...</p>
      </section>
    );
  }

  return (
    <section className="section">
      <h1
        style={{
          marginBottom: "1rem",
          fontSize: "1.8rem",
          fontWeight: 700,
          color: "#2C1810",
        }}
      >
        📌 Juz {juz} → Surah {surahNumber}  
        <br />
        {filterType === "audio" ? "🎧 Audio Tafsiir" : "🎥 Video Tafsiir"}
      </h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Raadi qayb (section, title)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "1.2rem",
          borderRadius: "10px",
          border: "2px solid #D4AF37",
          background: "#FFF8F3",
        }}
      />

      {/* SECTIONS */}
      <div className="card-grid">
        {sections.map((sec) => (
          <article key={sec._id} className="card">

            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
              {sec.title}
            </h3>

            <p style={{ marginBottom: ".6rem", fontSize: "0.9rem" }}>
              Surah: {sec.surah} &nbsp; | &nbsp; 
              Juz: {sec.juz} &nbsp; | &nbsp;
              Ayah: {sec.ayahFrom}–{sec.ayahTo}
              {sec.sectionNumber && (
                <>
                  {" "}|{" "}
                  <b>Qayb:</b> {sec.sectionNumber}
                </>
              )}
            </p>

            {/* VIDEO */}
            {filterType === "video" && (
              <>
                {isYouTube(sec.url) ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={convertToEmbed(sec.url)}
                    style={{
                      borderRadius: "10px",
                      border: "3px solid #D4AF37",
                    }}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={sec.url}
                    controls
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      border: "3px solid #D4AF37",
                    }}
                  />
                )}
              </>
            )}

            {/* AUDIO */}
            {filterType === "audio" && (
              <div
                style={{
                  padding: "1rem",
                  background: "#FFF8F3",
                  borderRadius: "10px",
                  border: "2px solid #D4AF37",
                }}
              >
                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    margin: "auto",
                    background: "#D4AF37",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "2rem",
                    color: "#2C1810",
                    marginBottom: "0.8rem",
                  }}
                >
                  🎧
                </div>

                <audio
                  src={sec.url}
                  controls
                  ref={audioRef}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </article>
        ))}

        {sections.length === 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "#932F2F",
            }}
          >
            Qayb tafsiir lama helin.
          </p>
        )}
      </div>
    </section>
  );
};

export default SectionViewer;
