import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API =
`${import.meta.env.VITE_API_URL}/api/duruus/books`;

const Kutub = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.sheikhName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="kutub-page">

      {/* LANTERNS */}
      <div className="lantern lantern-left">🏮</div>
      <div className="lantern lantern-right">🏮</div>

      {/* HEADER */}
      <div className="hero">

        <div className="moon-icon">
          ☪
        </div>

        <h1 className="kutub-title">
          Kutubta uu akhriyey
          <span> Shiikh Cabdinaasir Xaaji Axmed</span>
        </h1>

        <div className="divider"></div>

        <p className="kutub-sub">
          Waxaa kuugu diyaar ah dhammaan kutubtii uu akhriyey
          shiikh cabdinaasir xaaji axmed.
        </p>

        {/* SEARCH */}
        <div className="search-wrap">
          <input
            type="text"
            placeholder="🔍 Raadi kitaab ama sheikh..."
            className="kutub-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      {/* BOOKS */}
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

              {/* IMAGE */}
              <div className="kutub-image">
                <img
                  src={
                    book.image ||
                    "/images/bookcover.jpeg"
                  }
                  alt={book.title}
                />

                <div className="book-icon">
                  📖
                </div>
              </div>

              {/* CONTENT */}
              <div className="kutub-content">

                <h3 className="kutub-book">
                  {book.title}
                </h3>

                <p className="kutub-sheikh">
                  👤 {book.sheikhName}
                </p>

                <div className="mini-divider"></div>

                <p className="kutub-description">
                  {book.description || "Sharaxaad lama gelin"}
                </p>

                <button className="details-btn">
                  عرض التفاصيل
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`

      *{
        box-sizing:border-box;
      }

      body{
        background:#140402;
      }

      .kutub-page{
        position:relative;
        min-height:100vh;
        padding:3rem 1rem 5rem;
        overflow:hidden;

        background:
        radial-gradient(circle at top,
        rgba(255,170,0,0.08),
        transparent 40%),

        linear-gradient(
        to bottom,
        #1a0502,
        #120301,
        #090101);

        color:white;
      }

      /* ISLAMIC PATTERN */
      .kutub-page::before{
        content:"";
        position:absolute;
        inset:0;

        background-image:
        radial-gradient(
        rgba(212,175,55,0.05) 1px,
        transparent 1px);

        background-size:40px 40px;

        opacity:0.3;
        pointer-events:none;
      }

      /* LANTERNS */
      .lantern{
        position:absolute;
        top:20px;
        font-size:5rem;
        z-index:10;
        animation:float 3s ease-in-out infinite;
        filter:drop-shadow(0 0 20px rgba(255,190,70,0.6));
      }

      .lantern-left{
        left:40px;
      }

      .lantern-right{
        right:40px;
      }

      @keyframes float{
        0%{
          transform:translateY(0px);
        }

        50%{
          transform:translateY(12px);
        }

        100%{
          transform:translateY(0px);
        }
      }

      /* HERO */
      .hero{
        text-align:center;
        max-width:1000px;
        margin:auto;
        position:relative;
        z-index:2;
      }

      .moon-icon{
        width:85px;
        height:85px;
        margin:auto;
        border-radius:22px;

        background:
        linear-gradient(
        145deg,
        rgba(212,175,55,0.15),
        rgba(212,175,55,0.04));

        border:1px solid rgba(212,175,55,0.45);

        display:flex;
        align-items:center;
        justify-content:center;

        font-size:2.5rem;
        color:#d4af37;

        margin-bottom:2rem;

        box-shadow:
        0 0 30px rgba(212,175,55,0.18);
      }

      .kutub-title{
        font-size:4rem;
        font-weight:900;
        line-height:1.15;
        margin-bottom:1rem;
        color:white;
      }

      .kutub-title span{
        display:block;
        color:#d4af37;
      }

      .divider{
        width:240px;
        height:2px;
        margin:1.5rem auto;

        background:
        linear-gradient(
        to right,
        transparent,
        #d4af37,
        transparent);
      }

      .kutub-sub{
        font-size:1.15rem;
        color:#d6d6d6;
        line-height:1.7;
        margin-bottom:2.5rem;
      }

      /* SEARCH */
      .search-wrap{
        display:flex;
        justify-content:center;
      }

      .kutub-search{
        width:100%;
        max-width:760px;

        padding:1.2rem 1.5rem;

        border-radius:999px;

        border:1.5px solid rgba(212,175,55,0.4);

        outline:none;

        background:
        rgba(20,5,2,0.9);

        color:white;

        font-size:1rem;

        box-shadow:
        inset 0 0 20px rgba(212,175,55,0.05),
        0 0 20px rgba(0,0,0,0.4);

        transition:0.3s;
      }

      .kutub-search:focus{
        border-color:#d4af37;

        box-shadow:
        0 0 25px rgba(212,175,55,0.2);
      }

      .kutub-search::placeholder{
        color:#bbb;
      }

      /* GRID */
      .kutub-grid{
        margin-top:4rem;

        display:grid;

        grid-template-columns:
        repeat(auto-fit,minmax(290px,1fr));

        gap:2rem;

        position:relative;
        z-index:2;
      }

      /* CARD */
      .kutub-card{
        background:
        linear-gradient(
        to bottom,
        rgba(24,6,2,0.95),
        rgba(10,2,1,0.98));

        border-radius:30px;

        overflow:hidden;

        border:1.5px solid rgba(212,175,55,0.4);

        cursor:pointer;

        transition:0.4s;

        box-shadow:
        0 10px 35px rgba(0,0,0,0.45);

        position:relative;
      }

      .kutub-card:hover{
        transform:translateY(-10px);

        box-shadow:
        0 20px 45px rgba(0,0,0,0.55),
        0 0 25px rgba(212,175,55,0.15);
      }

      /* IMAGE */
      .kutub-image{
        position:relative;
        height:240px;
        overflow:hidden;
      }

      .kutub-image img{
        width:100%;
        height:100%;
        object-fit:cover;
        transition:0.6s;
      }

      .kutub-card:hover img{
        transform:scale(1.08);
      }

      .kutub-image::after{
        content:"";
        position:absolute;
        inset:0;

        background:
        linear-gradient(
        to bottom,
        rgba(0,0,0,0),
        rgba(0,0,0,0.45));
      }

      .book-icon{
        position:absolute;
        top:14px;
        left:14px;

        width:55px;
        height:55px;

        border-radius:16px;

        background:
        rgba(20,5,2,0.9);

        border:1px solid rgba(212,175,55,0.5);

        display:flex;
        align-items:center;
        justify-content:center;

        font-size:1.5rem;

        z-index:5;

        box-shadow:
        0 0 20px rgba(212,175,55,0.2);
      }

      /* CONTENT */
      .kutub-content{
        padding:1.5rem;
        text-align:center;
      }

      .kutub-book{
        font-size:2rem;
        font-weight:800;
        color:white;
        margin-bottom:0.8rem;
      }

      .kutub-sheikh{
        color:#d4af37;
        font-weight:600;
        margin-bottom:1rem;
      }

      .mini-divider{
        width:90px;
        height:2px;

        margin:1rem auto;

        background:
        linear-gradient(
        to right,
        transparent,
        #d4af37,
        transparent);
      }

      .kutub-description{
        color:#d8d8d8;
        line-height:1.8;
        font-size:0.97rem;
        margin-bottom:1.7rem;
      }

      .details-btn{
        background:transparent;
        border:1px solid rgba(212,175,55,0.5);

        color:#d4af37;

        padding:0.9rem 1.5rem;

        border-radius:999px;

        font-size:1rem;
        font-weight:700;

        cursor:pointer;

        transition:0.3s;
      }

      .details-btn:hover{
        background:#d4af37;
        color:#140402;
      }

      .kutub-loading,
      .kutub-empty{
        text-align:center;
        margin-top:4rem;
        font-size:1.1rem;
        color:#eee;
      }

      /* MOBILE */
      @media(max-width:768px){

        .kutub-title{
          font-size:2.6rem;
        }

        .lantern{
          font-size:3.5rem;
        }

        .lantern-left{
          left:10px;
        }

        .lantern-right{
          right:10px;
        }

        .kutub-image{
          height:210px;
        }
      }

      @media(max-width:480px){

        .kutub-page{
          padding-top:5rem;
        }

        .kutub-title{
          font-size:2rem;
        }

        .kutub-sub{
          font-size:0.95rem;
        }

        .kutub-search{
          padding:1rem;
        }

        .kutub-book{
          font-size:1.5rem;
        }

        .kutub-grid{
          gap:1.5rem;
        }

        .kutub-image{
          height:190px;
        }
      }

      `}</style>

    </div>
  );
};

export default Kutub;