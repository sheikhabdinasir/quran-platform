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

body{
  overflow-x:hidden;
  background:#02110D;
}

/* ================= PAGE ================= */

.kutub-page{

  min-height:100vh;

  background:
  radial-gradient(
    circle at top,
    rgba(0,90,60,.25),
    transparent 35%
  ),

  linear-gradient(
    180deg,
    #02110D 0%,
    #032019 45%,
    #02110D 100%
  );

  padding:2rem 1rem 5rem;

  position:relative;

  overflow:hidden;
}

/* ISLAMIC PATTERN */

.kutub-page::before{

  content:"";

  position:absolute;

  inset:0;

  background-image:
  radial-gradient(
    rgba(212,175,55,.05) 1px,
    transparent 1px
  );

  background-size:38px 38px;

  opacity:.25;

  pointer-events:none;
}

/* SIDE GLOW */

.kutub-page::after{

  content:"";

  position:absolute;

  width:900px;
  height:900px;

  border-radius:50%;

  background:
  radial-gradient(
    rgba(255,215,90,.08),
    transparent 70%
  );

  top:-300px;
  left:50%;

  transform:translateX(-50%);

  pointer-events:none;
}

/* ================= TITLE ================= */

.kutub-title{

  text-align:center;

  font-size:clamp(
    2rem,
    5vw,
    4rem
  );

  font-weight:900;

  line-height:1.15;

  margin-bottom:.8rem;

  background:
  linear-gradient(
    180deg,
    #FFFFFF 0%,
    #FFE082 55%,
    #D4AF37 100%
  );

  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;

  letter-spacing:-1px;

  text-shadow:
  0 8px 35px rgba(255,215,90,.16);
}

/* SUBTEXT */

.kutub-sub{

  text-align:center;

  color:
  rgba(255,255,255,.75);

  margin-bottom:2.5rem;

  font-size:1rem;

  line-height:1.9;

  max-width:760px;

  margin-inline:auto;
}

/* ================= SEARCH ================= */

.kutub-search{

  width:100%;

  max-width:720px;

  display:block;

  margin:0 auto 3rem;

  padding:1.1rem 1.4rem;

  border-radius:999px;

  border:
  1px solid rgba(212,175,55,.35);

  outline:none;

  font-size:1rem;

  background:
  rgba(4,40,28,.82);

  color:#fff;

  backdrop-filter:blur(18px);

  box-shadow:
  0 0 0 1px rgba(255,215,90,.08),
  0 12px 35px rgba(0,0,0,.35),
  0 0 25px rgba(255,215,90,.08);
}

.kutub-search::placeholder{

  color:
  rgba(255,255,255,.48);
}

/* ================= GRID ================= */

.kutub-grid{

  display:grid;

  grid-template-columns:
  repeat(
    auto-fill,
    minmax(270px,1fr)
  );

  gap:2rem;
}

/* ================= CARD ================= */

.kutub-card{

  background:
  linear-gradient(
    180deg,
    rgba(0,42,28,.96),
    rgba(1,22,15,.98)
  );

  border-radius:28px;

  overflow:hidden;

  cursor:pointer;

  transition:.35s ease;

  position:relative;

  box-shadow:
  0 14px 40px rgba(0,0,0,.28);

  border:
  1px solid rgba(212,175,55,.45);
}

/* OUTER GOLD GLOW */

.kutub-card::before{

  content:"";

  position:absolute;

  inset:0;

  border-radius:28px;

  padding:1.5px;

  background:
  linear-gradient(
    135deg,
    #FFD95A,
    rgba(255,217,90,.2),
    #FFD95A
  );

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask-composite:xor;

  mask-composite:exclude;

  pointer-events:none;
}

/* HOVER */

.kutub-card:hover{

  transform:
  translateY(-10px);

  box-shadow:
  0 25px 55px rgba(0,0,0,.45),
  0 0 25px rgba(255,215,90,.12);
}

/* ================= IMAGE ================= */

.kutub-image{

  position:relative;

  height:220px;

  overflow:hidden;
}

.kutub-image img{

  width:100%;
  height:100%;

  object-fit:cover;

  transition:
  transform .7s ease;
}

.kutub-card:hover img{

  transform:scale(1.08);
}

/* GOLD OVERLAY */

.kutub-image::after{

  content:"";

  position:absolute;

  inset:0;

  background:
  linear-gradient(
    to bottom,
    rgba(0,0,0,.05),
    rgba(0,0,0,.58)
  );
}

/* SMALL ICON */

.kutub-image::before{

  content:"📖";

  position:absolute;

  top:14px;
  left:14px;

  width:44px;
  height:44px;

  border-radius:14px;

  display:flex;

  align-items:center;

  justify-content:center;

  background:
  rgba(0,55,38,.92);

  border:
  1px solid rgba(255,215,90,.35);

  color:#FFD95A;

  font-size:1.1rem;

  z-index:2;

  box-shadow:
  0 8px 18px rgba(0,0,0,.25);
}

/* ================= CONTENT ================= */

.kutub-content{

  padding:1.3rem;
}

/* BOOK TITLE */

.kutub-book{

  font-size:1.35rem;

  font-weight:900;

  color:#fff;

  margin-bottom:.7rem;

  line-height:1.4;

  text-align:center;
}

/* SHEIKH */

.kutub-sheikh{

  font-size:.95rem;

  color:#FFD95A;

  font-weight:700;

  margin-bottom:1rem;

  text-align:center;
}

/* DIVIDER */

.kutub-sheikh::after{

  content:"✦";

  display:block;

  color:#FFD95A;

  margin-top:.7rem;

  font-size:.9rem;

  opacity:.9;
}

/* DESCRIPTION */

.kutub-description{

  font-size:.95rem;

  color:
  rgba(255,255,255,.74);

  line-height:1.8;

  text-align:center;
}

/* BUTTON STYLE */

.kutub-content::after{

  content:"📖 عرض التفاصيل";

  display:flex;

  align-items:center;

  justify-content:center;

  gap:8px;

  width:fit-content;

  margin:1.4rem auto 0;

  padding:.9rem 1.4rem;

  border-radius:999px;

  border:
  1px solid rgba(255,215,90,.45);

  color:#FFD95A;

  font-size:.95rem;

  font-weight:700;

  background:
  rgba(255,215,90,.04);

  box-shadow:
  0 10px 25px rgba(0,0,0,.22);
}

/* ================= STATES ================= */

.kutub-loading,
.kutub-empty{

  text-align:center;

  margin-top:3rem;

  font-weight:600;

  color:
  rgba(255,255,255,.72);

  font-size:1rem;
}

/* ================= MOBILE ================= */

@media(max-width:768px){

  .kutub-title{

    font-size:2.2rem;
  }

  .kutub-sub{

    font-size:.94rem;
  }

  .kutub-image{

    height:200px;
  }

  .kutub-grid{

    gap:1.5rem;
  }
}

/* ================= SMALL MOBILE ================= */

@media(max-width:480px){

  .kutub-title{

    font-size:1.7rem;
  }

  .kutub-sub{

    font-size:.88rem;

    line-height:1.7;
  }

  .kutub-image{

    height:180px;
  }

  .kutub-book{

    font-size:1.1rem;
  }

  .kutub-description{

    font-size:.85rem;
  }

  .kutub-search{

    font-size:.9rem;

    padding:1rem 1.1rem;
  }
}
      `}</style>
    </div>
  );
};

export default Kutub;