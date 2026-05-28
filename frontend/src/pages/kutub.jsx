import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = `${import.meta.env.VITE_API_URL}/api/duruus/books`;

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

      {/* HEADER */}
      <div className="kutub-header">
        <h1 className="kutub-title">
          ✦ Kutubta ✦
        </h1>

        <p className="kutub-sub">
          Waxaa kuugu diyaar ah dhammaan kutubtii uu akhriyey
          Shiikh Cabdinaasir Xaaji Axmed.
        </p>
      </div>

      {/* SEARCH */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="🔍 Raadi kitaab ama sheikh..."
          className="kutub-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="loading-box">
          <div className="loader"></div>
          <p>Loading Kutub...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <p className="kutub-empty">
          Kitaab lama helin
        </p>
      ) : (
        <div className="kutub-grid">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="kutub-card"
              onClick={() => navigate(`/kutub/${book._id}`)}
            >
              {/* IMAGE */}
              <div className="kutub-image">
                <img
                  src={
                    book.image ||
                    "/images/bookcover.jpeg"
                  }
                  alt={book.title}
                />

                <div className="image-overlay"></div>

                <div className="book-badge">
                  📚
                </div>
              </div>

              {/* CONTENT */}
              <div className="kutub-content">

                <h2 className="kutub-book">
                  {book.title}
                </h2>

                <p className="kutub-sheikh">
                  🎙 {book.sheikhName}
                </p>

                <p className="kutub-description">
                  {book.description ||
                    "Sharaxaad laguma darin kitaabkan."}
                </p>

                <button className="kutub-btn">
                  Akhri Kutubta →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= CSS ================= */}

      <style>{`

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          background:#f7f4ee;
          font-family: "Poppins", sans-serif;
        }

        .kutub-page{
          width:100%;
          min-height:100vh;
          padding:60px 20px 80px;
          background:
          linear-gradient(
            rgba(247,244,238,0.96),
            rgba(247,244,238,0.96)
          ),
          url("https://www.transparenttextures.com/patterns/arabesque.png");
        }

        /* HEADER */

        .kutub-header{
          text-align:center;
          margin-bottom:50px;
        }

        .kutub-title{
          font-size:4rem;
          font-weight:900;
          color:#0d3b2e;
          margin-bottom:18px;
          letter-spacing:1px;
          font-family: serif;
        }

        .kutub-sub{
          max-width:750px;
          margin:auto;
          color:#6f5b2d;
          line-height:1.9;
          font-size:1.15rem;
          font-weight:500;
        }

        /* SEARCH */

        .search-wrapper{
          display:flex;
          justify-content:center;
          margin-bottom:60px;
        }

        .kutub-search{
          width:100%;
          max-width:750px;
          height:72px;
          border:none;
          outline:none;
          padding:0 28px;
          border-radius:22px;
          background:#fff;
          font-size:1.05rem;
          color:#333;
          border:2px solid #d6b566;
          box-shadow:
          0 10px 35px rgba(0,0,0,0.08);
          transition:0.3s ease;
        }

        .kutub-search:focus{
          border-color:#0d3b2e;
          transform:translateY(-2px);
        }

        /* GRID */

        .kutub-grid{
          width:100%;
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(320px,1fr));
          gap:35px;
        }

        /* CARD */

        .kutub-card{
          background:#fffdf9;
          border-radius:32px;
          overflow:hidden;
          cursor:pointer;
          position:relative;
          transition:0.4s ease;
          border:1px solid #ead7a3;

          box-shadow:
          0 15px 40px rgba(0,0,0,0.08);
        }

        .kutub-card:hover{
          transform:translateY(-10px);
          box-shadow:
          0 25px 50px rgba(0,0,0,0.14);
        }

        /* IMAGE */

        .kutub-image{
          width:100%;
          height:260px;
          position:relative;
          overflow:hidden;
        }

        .kutub-image img{
          width:100%;
          height:100%;
          object-fit:cover;
          transition:0.6s ease;
        }

        .kutub-card:hover img{
          transform:scale(1.08);
        }

        .image-overlay{
          position:absolute;
          inset:0;
          background:
          linear-gradient(
            to bottom,
            rgba(0,0,0,0.1),
            rgba(0,0,0,0.35)
          );
        }

        /* BADGE */

        .book-badge{
          position:absolute;
          top:18px;
          right:18px;
          width:52px;
          height:52px;
          background:#0d3b2e;
          color:#d6b566;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:16px;
          font-size:1.4rem;
          border:2px solid #d6b566;
          z-index:2;
        }

        /* CONTENT */

        .kutub-content{
          padding:28px;
        }

        .kutub-book{
          font-size:1.7rem;
          color:#0d3b2e;
          font-weight:800;
          margin-bottom:12px;
          line-height:1.4;
        }

        .kutub-sheikh{
          color:#b4872d;
          font-size:1rem;
          font-weight:700;
          margin-bottom:18px;
        }

        .kutub-description{
          color:#555;
          line-height:1.9;
          font-size:0.98rem;
          margin-bottom:25px;
        }

        /* BUTTON */

        .kutub-btn{
          width:100%;
          height:55px;
          border:none;
          border-radius:16px;
          background:#0d3b2e;
          color:#fff;
          font-size:1rem;
          font-weight:700;
          cursor:pointer;
          transition:0.3s ease;
        }

        .kutub-btn:hover{
          background:#145240;
          transform:translateY(-2px);
        }

        /* LOADING */

        .loading-box{
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:18px;
          margin-top:80px;
          color:#0d3b2e;
          font-weight:700;
        }

        .loader{
          width:60px;
          height:60px;
          border-radius:50%;
          border:5px solid #e5d2a0;
          border-top:5px solid #0d3b2e;
          animation:spin 1s linear infinite;
        }

        @keyframes spin{
          100%{
            transform:rotate(360deg);
          }
        }

        .kutub-empty{
          text-align:center;
          font-size:1.2rem;
          color:#777;
          margin-top:60px;
          font-weight:700;
        }

        /* RESPONSIVE */

        @media(max-width:992px){

          .kutub-title{
            font-size:3rem;
          }

          .kutub-grid{
            gap:28px;
          }

        }

        @media(max-width:768px){

          .kutub-page{
            padding:40px 16px 60px;
          }

          .kutub-title{
            font-size:2.4rem;
          }

          .kutub-sub{
            font-size:1rem;
            line-height:1.7;
          }

          .kutub-search{
            height:65px;
            font-size:0.95rem;
          }

          .kutub-image{
            height:220px;
          }

          .kutub-book{
            font-size:1.4rem;
          }

        }

        @media(max-width:480px){

          .kutub-title{
            font-size:2rem;
          }

          .kutub-grid{
            grid-template-columns:1fr;
          }

          .kutub-card{
            border-radius:24px;
          }

          .kutub-content{
            padding:22px;
          }

          .kutub-image{
            height:200px;
          }

          .kutub-btn{
            height:50px;
            font-size:0.95rem;
          }

        }

      `}</style>
    </div>
  );
};

export default Kutub;