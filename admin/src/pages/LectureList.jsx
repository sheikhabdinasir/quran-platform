import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import toast from "react-hot-toast";
import { playDing } from "../utils/playSound";

const LectureList = () => {
  const [lectures, setLectures] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(null);
  const [targetId, setTargetId] = useState(null);

  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchLectures = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/lectures/admin-all"
      );
      setLectures(res.data.data);
    } catch {
      toast.error("❌ Error loading lectures");
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  /* ================= SEARCH ================= */
  const filteredLectures = lectures.filter((l) => {
    const k = search.toLowerCase();
    return (
      l.title.toLowerCase().includes(k) ||
      l.speaker.toLowerCase().includes(k) ||
      l.description.toLowerCase().includes(k)
    );
  });

  /* ================= SELECT ================= */
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelected(filteredLectures.map((l) => l._id));
  const clearSelection = () => setSelected([]);

  /* ================= TOGGLE ACTIVE ================= */
  const toggleActive = async (id) => {
    await axios.put(`http://localhost:4000/api/lectures/toggle/${id}`);
    playDing();
    toast.success("🔄 Status waa la beddelay");
    fetchLectures();
  };

  /* ================= FAVORITE ================= */
  const toggleFavorite = async (id) => {
    await axios.put(`http://localhost:4000/api/lectures/favorite/${id}`);
    playDing();
    toast.success("⭐ Favorite waa la beddelay");
    fetchLectures();
  };

  /* ================= DELETE ================= */
  const openDelete = (mode, id = null) => {
    setDeleteMode(mode);
    setTargetId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteMode === "single") {
        await axios.delete(
          `http://localhost:4000/api/lectures/delete/${targetId}`
        );
      }

      if (deleteMode === "multiple") {
        await Promise.all(
          selected.map((id) =>
            axios.delete(`http://localhost:4000/api/lectures/delete/${id}`)
          )
        );
        setSelected([]);
      }

      if (deleteMode === "all") {
        await Promise.all(
          lectures.map((l) =>
            axios.delete(`http://localhost:4000/api/lectures/delete/${l._id}`)
          )
        );
        setSelected([]);
      }

      playDing();
      toast.success(" Muxaadarada waa la tirtiray");
      fetchLectures();
    } catch {
      toast.error("❌ Khalad ayaa dhacay");
    } finally {
      setShowModal(false);
      setDeleteMode(null);
      setTargetId(null);
    }
  };

  return (
    <section className="lecture-wrapper">

      <h2 className="title">🎙️Maamulka Muxaadarooyinka</h2>

      {/* SEARCH */}
      <input
        className="search-input"
        placeholder="🔍 Raadi: Shiikh, Muxaadaro ama Description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ACTION BAR */}
      <div className="action-bar">
        <button className="btn gold" onClick={selectAll}>Select All</button>
        <button className="btn gray" onClick={clearSelection}>Clear</button>
        <button
  className="btn red"
  disabled={selected.length === 0}
  onClick={() => openDelete("multiple")}
>
  Delete Selected
</button>

        
      </div>

      {/* LIST */}
      {filteredLectures.map((l, index) => (
        <div key={l._id} className="lecture-row">

          {/* TOP */}
          <div className="row-top">

            <div className="row-left">
              <input
                type="checkbox"
                checked={selected.includes(l._id)}
                onChange={() => toggleSelect(l._id)}
              />
              <span className="row-number">#{index + 1}</span>
            </div>

            <button
              className={`row-status ${l.isActive ? "active" : "inactive"}`}
              onClick={() => toggleActive(l._id)}
            >
              {l.isActive ? "Active" : "Inactive"}
            </button>
          </div>

          {/* TITLE */}
          <h3 className="row-title">{l.title}</h3>

          {/* AUDIO */}
          <div className="row-audio">
            <AudioPlayer link={l.link} />
          </div>

          {/* ACTIONS */}
          <div className="row-actions">

            <button
              className={`btn ${l.isFavorite ? "gold" : "gray"}`}
              onClick={() => toggleFavorite(l._id)}
            >
              {l.isFavorite ? "⭐ Favorite" : "☆ Favorite"}
            </button>

            <button
              className="btn blue"
              onClick={() => navigate(`/edit-lecture/${l._id}`)}
            >
              Edit
            </button>

            <button
              className="btn red"
              onClick={() => openDelete("single", l._id)}
            >
              Delete
            </button>

          </div>

        </div>
      ))}

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>⚠️ Digniin</h3>
            <p>Ma hubtaa inaad tirtirto?</p>

            <div className="modal-actions">
              <button className="btn gray" onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button className="btn red" onClick={confirmDelete}>
                Haa, Tirtir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .lecture-wrapper { padding:2rem; }

        .title { font-size:2rem; font-weight:800; margin-bottom:1rem; }

        .search-input {
          width:100%;
          max-width:420px;
          padding:12px 18px;
          border-radius:999px;
          border:2px solid #D4AF37;
          margin-bottom:1.4rem;
        }

        .action-bar {
          display:flex;
          gap:.6rem;
          flex-wrap:wrap;
          margin-bottom:1.4rem;
        }

        .lecture-row {
          background:#fff;
          border-radius:14px;
          padding:16px;
          box-shadow:0 8px 22px rgba(0,0,0,.08);
          margin-bottom:1rem;
        }

        .row-top {
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .row-left {
          display:flex;
          gap:8px;
          align-items:center;
        }

        .row-number { font-weight:800; }

        .row-status {
          padding:6px 14px;
          border-radius:999px;
          border:none;
          font-weight:700;
        }

        .row-status.active {
          background:#d1fae5;
          color:#065f46;
        }

        .row-status.inactive {
          background:#fee2e2;
          color:#7f1d1d;
        }

        .row-title {
          margin:10px 0;
          font-size:1.1rem;
          font-weight:700;
        }

        .row-actions {
          display:flex;
          gap:10px;
          margin-top:12px;
          flex-wrap:wrap;
        }

        .btn {
          padding:7px 14px;
          border-radius:6px;
          border:none;
          font-weight:600;
          cursor:pointer;
          font-size:.85rem;
        }

        .blue { background:#2563EB; color:#fff; }
        .red { background:#DC2626; color:#fff; }
        .gold { background:#D4AF37; }
        .gray { background:#9CA3AF; }
        .dark { background:#111827; color:#fff; }

        .modal-overlay {
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.6);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:999;
        }

        .modal-box {
          background:#FFF8F3;
          padding:2rem;
          border-radius:1.4rem;
          border-top:6px solid #D4AF37;
          text-align:center;
          max-width:380px;
          width:90%;
        }

        .modal-actions {
          display:flex;
          justify-content:center;
          gap:1rem;
          margin-top:1.2rem;
        }
      `}</style>
    </section>
  );
};

export default LectureList;
