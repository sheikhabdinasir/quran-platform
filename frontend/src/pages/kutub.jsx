import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API =
`${import.meta.env.VITE_API_URL}/api/duruus/books`;

const Kutub = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ================= FETCH BOOKS ================= */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();

        // backend returns:
        // { success: true, books: [...] }
        setBooks(
          (data.books || []).filter((book) => book.isActive)
        );
      } catch (error) {
        console.error("Failed to load books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* ================= SEARCH FILTER ================= */
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.sheikhName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="kutub-page">
      {/* PAGE TITLE */}
     

      <p className="kutub-sub">
         ✦ halkan ka xulo dhammaan Kutubta ✦ 
        </p>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Raadi kitaab ama sheikh..."
        className="kutub-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LOADING / EMPTY / DATA */}
      {loading ? (
        <p className="kutub-loading">Loading...</p>
      ) : filteredBooks.length === 0 ? (
        <p className="kutub-empty">Ma jiro kitaab la helay</p>
      ) : (
        <div className="kutub-grid">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="kutub-card"
              onClick={() => navigate(`/kutub/${book._id}`)}
            >
              {/* BOOK IMAGE */}
              <div className="kutub-image">
                <img
                  src={
                    book.image ||
                    "/images/bookcover.jpeg"
                  }
                  alt={book.title}
                />
              </div>

              {/* CONTENT */}
              <div className="kutub-content">
                <h3 className="kutub-book">
                  {book.title}
                </h3>

                <p className="kutub-sheikh">
                  🎙 {book.sheikhName}
                </p>

               <p className="kutub-description">
  {book.description}
</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= CSS ================= */}
      <style>{`
        .kutub-page {
          max-width: 1200px;
          margin: auto;
          padding: 2rem 1rem 4rem;
        }

        .kutub-title {
          text-align: center;
          font-size: 2.4rem;
          font-weight: 900;
          color: #15102c;
          margin-bottom: 0.5rem;
        }

        .kutub-sub {
          text-align: center;
          color: #6b4e16;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .kutub-search {
          width: 100%;
          max-width: 520px;
          display: block;
          margin: 0 auto 2.5rem;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          border: 2px solid #D4AF37;
          outline: none;
          font-size: 1rem;
          background: #fff;
        }

        /* GRID */
        .kutub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 2rem;
        }

        /* CARD */
        .kutub-card {
          background: #fffaf0;
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid #D4AF37;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          transition: 0.35s ease;
          animation: fadeUp 0.5s ease;
        }

        .kutub-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
        }

        /* IMAGE */
        .kutub-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .kutub-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .kutub-card:hover img {
          transform: scale(1.08);
        }

        .kutub-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.05),
            rgba(0,0,0,0.35)
          );
        }

        /* CONTENT */
        .kutub-content {
          padding: 1.2rem;
        }

        .kutub-book {
          font-size: 1.15rem;
          font-weight: 800;
          color: #2c1810;
          margin-bottom: 0.4rem;
        }

        .kutub-sheikh {
          font-size: 0.95rem;
          color: #5c3b0b;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }

        .kutub-description {
          font-size: 0.92rem;
          color: #555;
          line-height: 1.5;
        }

        .kutub-loading,
        .kutub-empty {
          text-align: center;
          margin-top: 3rem;
          font-weight: 600;
          color: #555;
          font-size: 1rem;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .kutub-title {
            font-size: 2rem;
          }

          .kutub-image {
            height: 190px;
          }
        }

        @media (max-width: 480px) {
          .kutub-title {
            font-size: 1.6rem;
          }

          .kutub-image {
            height: 160px;
          }

          .kutub-book {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Kutub;