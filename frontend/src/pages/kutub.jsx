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
      <h1 className="kutub-title">
        📚 halkan ka xulo dhammaan Kutubta
      </h1>

      <p className="kutub-sub">
        Waxaa kuugu diyaar ah dhammaan kutubtii uu akhriyey
        shiikh cabdinaasir xaaji axmed.
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
                  {book.description || "Sharaxaad lama gelin"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= CSS ================= */}
      <style>{`
  
  *{
    box-sizing:border-box;
  }

  .kutub-page {
    max-width: 1380px;
    margin: auto;
    padding: 2.5rem 1.2rem 5rem;
    min-height: 100vh;

    background:
      radial-gradient(circle at top, rgba(16,70,48,0.45), transparent 45%),
      linear-gradient(to bottom, #021b14, #03110d);

    border-radius: 32px;
    border: 1px solid rgba(212,175,55,0.25);

    box-shadow:
      0 0 40px rgba(0,0,0,0.45),
      inset 0 0 80px rgba(255,215,120,0.03);

    position: relative;
    overflow: hidden;
  }

  /* ISLAMIC GLOW */
  .kutub-page::before{
    content:"";
    position:absolute;
    inset:0;
    background:
      radial-gradient(circle at left top,
      rgba(212,175,55,0.06), transparent 30%),
      radial-gradient(circle at right top,
      rgba(212,175,55,0.06), transparent 30%);
    pointer-events:none;
  }

  /* TITLE */
  .kutub-title {
    text-align: center;
    font-size: 3.2rem;
    font-weight: 900;
    line-height: 1.15;
    margin-bottom: 0.7rem;
    color: #fff;

    text-shadow:
      0 0 12px rgba(255,255,255,0.08),
      0 0 25px rgba(212,175,55,0.18);
  }

  .kutub-title span{
    color:#d4af37;
  }

  .kutub-sub {
    text-align: center;
    color: #d7d7d7;
    margin-bottom: 2.3rem;
    font-size: 1.05rem;
    font-weight: 400;
  }

  /* SEARCH */
  .kutub-search {
    width: 100%;
    max-width: 720px;
    display: block;
    margin: 0 auto 3rem;

    padding: 1.1rem 1.4rem;

    border-radius: 999px;

    border: 1.5px solid rgba(212,175,55,0.35);

    outline: none;

    font-size: 1rem;

    background:
      linear-gradient(to right,
      rgba(8,40,29,0.95),
      rgba(4,24,18,0.95));

    color: white;

    box-shadow:
      inset 0 0 15px rgba(255,215,120,0.05),
      0 0 18px rgba(0,0,0,0.35);

    transition: 0.3s ease;
  }

  .kutub-search::placeholder{
    color:#bcbcbc;
  }

  .kutub-search:focus{
    border-color:#d4af37;

    box-shadow:
      0 0 18px rgba(212,175,55,0.22),
      inset 0 0 15px rgba(255,215,120,0.05);
  }

  /* GRID */
  .kutub-grid {
    display: grid;

    grid-template-columns:
      repeat(auto-fit, minmax(260px, 1fr));

    gap: 1.5rem;
  }

  /* CARD */
  .kutub-card {
    background:
      linear-gradient(to bottom,
      rgba(6,40,28,0.98),
      rgba(2,19,14,0.98));

    border-radius: 26px;

    overflow: hidden;

    border: 1.5px solid rgba(212,175,55,0.45);

    box-shadow:
      0 8px 30px rgba(0,0,0,0.45),
      inset 0 0 25px rgba(255,215,120,0.03);

    cursor: pointer;

    transition: 0.35s ease;

    animation: fadeUp 0.5s ease;

    position: relative;
  }

  .kutub-card:hover {
    transform: translateY(-7px);

    box-shadow:
      0 14px 40px rgba(0,0,0,0.55),
      0 0 25px rgba(212,175,55,0.15);
  }

  /* IMAGE */
  .kutub-image {
    position: relative;
    height: 210px;
    overflow: hidden;
  }

  .kutub-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .kutub-card:hover img {
    transform: scale(1.06);
  }

  .kutub-image::after {
    content: "";
    position: absolute;
    inset: 0;

    background:
      linear-gradient(
        to bottom,
        rgba(0,0,0,0.05),
        rgba(0,0,0,0.4)
      );
  }

  /* CONTENT */
  .kutub-content {
    padding: 1.15rem 1rem 1.4rem;
    text-align:center;
  }

  .kutub-book {
    font-size: 1.65rem;
    font-weight: 900;
    color: #fff;
    margin-bottom: 0.55rem;
    line-height:1.3;
  }

  .kutub-sheikh {
    font-size: 0.95rem;
    color: #d4af37;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .kutub-description {
    font-size: 0.93rem;
    color: #e1e1e1;
    line-height: 1.75;
  }

  /* BUTTON STYLE EFFECT */
  .kutub-card::after{
    content:"عرض التفاصيل";

    position:absolute;

    left:50%;
    transform:translateX(-50%);

    bottom:16px;

    background:transparent;

    border:1px solid rgba(212,175,55,0.65);

    color:#d4af37;

    padding:0.7rem 1.2rem;

    border-radius:999px;

    font-size:0.9rem;
    font-weight:700;

    opacity:0;

    transition:0.3s ease;
  }

  .kutub-card:hover::after{
    opacity:1;
    bottom:20px;
  }

  .kutub-loading,
  .kutub-empty {
    text-align: center;
    margin-top: 3rem;
    font-weight: 600;
    color: #fff;
    font-size: 1rem;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {

    .kutub-title {
      font-size: 2.3rem;
    }

    .kutub-grid{
      gap:1.2rem;
    }

    .kutub-image {
      height: 190px;
    }
  }

  @media (max-width: 480px) {

    .kutub-page{
      border-radius:20px;
      padding:2rem 0.9rem 4rem;
    }

    .kutub-title {
      font-size: 1.8rem;
    }

    .kutub-sub{
      font-size:0.92rem;
    }

    .kutub-search{
      padding:0.95rem 1rem;
    }

    .kutub-image {
      height: 170px;
    }

    .kutub-book {
      font-size: 1.25rem;
    }

    .kutub-description{
      font-size:0.88rem;
    }
  }
`}
      </style>
    </div>
  );
};

export default Kutub;