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
     

     


<div className="kutub-hero">

  <h1 className="kutub-title">
     Kutub
  </h1>

  <p className="kutub-sub">
✦ Halkan ka xulo dhammaan Kutubta✦
  </p>

</div>



      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Raadi Magaca kitaabka..."
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
                <div className="kutub-footer">
  <span className="kutub-open">
    ▶ Fur Kitaabka
  </span>
</div>

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
   
   /* HERO */

.kutub-hero{
  text-align:center;
  margin-bottom:40px;
}

.kutub-title{
  font-size:clamp(2.2rem,5vw,3.5rem);
  font-weight:900;
  color:#2C1810;
}

.kutub-sub{
  margin-top:12px;
  color:#6B5A4A;
  font-size:1rem;
  line-height:1.8;
}

.kutub-hero::after{
  content:"❈";
  display:block;
  margin-top:14px;
  color:#D4AF37;
  font-size:28px;
}
.kutub-search{
  width:100%;
  max-width:650px;

  display:block;
  margin:0 auto 35px;

  padding:18px 24px;

  border-radius:999px;

  border:1px solid #E8D8C8;

  outline:none;

  background:#fff;

  font-size:16px;

  color:#2C1810;

  box-shadow:0 10px 25px rgba(0,0,0,.08);

  transition:.3s;
}

.kutub-search:focus{
  border-color:#D4AF37;

  box-shadow:
    0 0 0 4px rgba(212,175,55,.15),
    0 10px 25px rgba(0,0,0,.08);
}

        /* GRID */
        .kutub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 2rem;
        }

        /* CARD */
  
        .kutub-card{
  background:#FFFFFF;

  border:1px solid #E8D8C8;

  border-radius:28px;

  overflow:hidden;

  cursor:pointer;

  transition:.35s ease;

  box-shadow:
    0 10px 25px rgba(0,0,0,.08);

  display:flex;
  flex-direction:column;

  height:100%;
}
.kutub-card:hover{
  transform:translateY(-8px);

  border-color:#D4AF37;

  box-shadow:
    0 20px 45px rgba(0,0,0,.14);
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
      
        .kutub-content{
  padding:1.3rem;

  display:flex;
  flex-direction:column;

  flex:1;
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

   .kutub-description{
  font-size:.92rem;
  color:#6B5A4A;
  line-height:1.6;

  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;

  overflow:hidden;

  margin-top:auto;
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


.kutub-footer{
  margin-top:18px;

  display:flex;
  justify-content:flex-end;
}

.kutub-open{
  color:#932F2F;

  font-weight:700;

  font-size:.95rem;

  transition:.3s;
}

.kutub-card:hover .kutub-open{
  color:#D4AF37;

  transform:translateX(6px);
}

      `}</style>
    </div>
  );
};

export default Kutub;