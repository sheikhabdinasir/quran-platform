import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { playDing } from "../utils/playSound";


const EditLecture = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    speaker: "",
    description: "",
    link: "",
  });

  const [loading, setLoading] = useState(true);

  /* ======================
     LOAD EXISTING DATA
  ====================== */
  useEffect(() => {
    const loadLecture = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/lectures/admin-all`
        );
        const lec = res.data.data.find((l) => l._id === id);

        if (!lec) {
          toast.error("❌ Lecture lama helin");
          navigate("/lectures");
          return;
        }

        setForm({
          title: lec.title,
          speaker: lec.speaker,
          description: lec.description,

          link: lec.link,
        });
      } catch (error) {
        toast.error("❌ Failed to load lecture");
      } finally {
        setLoading(false);
      }
    };

    loadLecture();
  }, [id, navigate]);

  /* ======================
     SUBMIT UPDATE
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/lectures/update/${id}`,
        form
      );

      playDing();
      toast.success("✅ Lecture si guul leh ayaa loo cusboonaysiiyay");

      setTimeout(() => {
        navigate("/lectures");
      }, 1200);
    } catch (error) {
      toast.error("❌ Khalad ayaa dhacay");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", fontWeight: 600 }}>
        Loading...
      </div>
    );
  }

  return (
    <section className="edit-wrapper">
      <div className="edit-card">
        <h2 className="edit-title">✏️ Edit Lecture</h2>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Magaca Muxaadarada</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Magaca Shiikhka</label>
            <input
              type="text"
              value={form.speaker}
              onChange={(e) =>
                setForm({ ...form, speaker: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="5"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Audio Link</label>
            <input
              type="text"
              value={form.link}
              onChange={(e) =>
                setForm({ ...form, link: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="update-btn">
            ✅ Update Lecture
          </button>
        </form>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        .edit-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background: #f9fafb;
        }

        .edit-card {
          width: 100%;
          max-width: 720px;
          background: #ffffff;
          padding: 2rem;
          border-radius: 1.4rem;
          box-shadow: 0 20px 45px rgba(0,0,0,0.12);
          animation: fadeUp .45s ease;
          border-top: 6px solid #D4AF37;
        }

        .edit-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1.6rem;
          color: #2C1810;
          text-align: center;
        }

        .edit-form {
          display: grid;
          gap: 1.2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-weight: 600;
          color: #374151;
        }

        .form-group input,
        .form-group textarea {
          padding: 12px 14px;
          border-radius: 0.75rem;
          border: 2px solid #e5e7eb;
          font-size: .95rem;
          transition: .3s;
          background: #FFF8F3;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #D4AF37;
          box-shadow: 0 0 0 3px rgba(212,175,55,.25);
        }

        .update-btn {
          margin-top: 1rem;
          padding: 14px;
          background: linear-gradient(90deg, #D4AF37, #b8921d);
          color: #2C1810;
          font-weight: 800;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: .3s;
          font-size: 1rem;
        }

        .update-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(0,0,0,.25);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .edit-card {
            padding: 1.5rem;
          }

          .edit-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </section>
  );
};

export default EditLecture;
