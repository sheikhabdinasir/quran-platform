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
  }

  .kutub-page{

    min-height:100vh;

    background:
    radial-gradient(
      circle at top,
      rgba(18,80,55,.35),
      transparent 30%
    ),

    linear-gradient(
      180deg,
      #03110D 0%,
      #071B15 30%,
      #04100D 70%,
      #020806 100%
    );

    padding:2rem 1rem 5rem;

    position:relative;

    overflow:hidden;
  }

  .kutub-page::before{

    content:"";

    position:absolute;

    inset:0;

    background-image:
    radial-gradient(
      rgba(212,175,55,.04) 1px,
      transparent 1px
    );

    background-size:40px 40px;

    opacity:.25;

    pointer-events:none;
  }

  /* TITLE */

  .kutub-title{

    text-align:center;

    font-size:2.4rem;

    font-weight:900;

    margin-bottom:.7rem;

    background:
    linear-gradient(
      135deg,
      #FFF6D6 0%,
      #FFD95A 45%,
      #D4AF37 100%
    );

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    letter-spacing:-1px;

    text-shadow:
    0 10px 35px rgba(255,215,90,.12);
  }

  .kutub-sub{

    text-align:center;

    color:
    rgba(255,245,220,.72);

    margin-bottom:2.2rem;

    font-size:1rem;

    line-height:1.7;

    max-width:700px;

    margin-inline:auto;
  }

  /* SEARCH */

  .kutub-search{

    width:100%;

    max-width:520px;

    display:block;

    margin:0 auto 2.8rem;

    padding:.95rem 1.2rem;

    border-radius:18px;

    border:
    1px solid rgba(255,215,90,.10);

    outline:none;

    font-size:1rem;

    background:
    rgba(18,45,35,.72);

    color:#fff;

    backdrop-filter:blur(18px);

    box-shadow:
    0 10px 25px rgba(0,0,0,.22);
  }

  .kutub-search::placeholder{

    color:
    rgba(255,255,255,.42);
  }

  /* GRID */

  .kutub-grid{

    display:grid;

    grid-template-columns:
    repeat(
      auto-fill,
      minmax(270px,1fr)
    );

    gap:2rem;
  }

  /* CARD */

  .kutub-card{

    background:
    linear-gradient(
      180deg,
      rgba(18,45,35,.95),
      rgba(10,25,20,.95)
    );

    border-radius:24px;

    overflow:hidden;

    border:
    1px solid rgba(255,215,90,.12);

    box-shadow:
    0 12px 35px rgba(0,0,0,.22);

    cursor:pointer;

    transition:.35s ease;

    animation:fadeUp .5s ease;

    position:relative;
  }

  .kutub-card:hover{

    transform:
    translateY(-8px);

    border:
    1px solid rgba(255,215,90,.24);

    box-shadow:
    0 20px 45px rgba(0,0,0,.35);
  }

  /* GOLD LINE */

  .kutub-card::before{

    content:"";

    position:absolute;

    top:0;
    left:0;

    width:100%;
    height:3px;

    background:
    linear-gradient(
      90deg,
      transparent,
      #FFD95A,
      transparent
    );

    opacity:.9;
  }

  /* IMAGE */

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
    transform .6s ease;
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
      rgba(0,0,0,.05),
      rgba(0,0,0,.55)
    );
  }

  /* CONTENT */

  .kutub-content{

    padding:1.2rem;
  }

  .kutub-book{

    font-size:1.15rem;

    font-weight:800;

    color:#fff;

    margin-bottom:.45rem;

    line-height:1.4;
  }

  .kutub-sheikh{

    font-size:.92rem;

    color:#FFD95A;

    font-weight:600;

    margin-bottom:.9rem;
  }

  .kutub-description{

    font-size:.9rem;

    color:
    rgba(255,255,255,.68);

    line-height:1.7;
  }

  /* STATES */

  .kutub-loading,
  .kutub-empty{

    text-align:center;

    margin-top:3rem;

    font-weight:600;

    color:
    rgba(255,255,255,.72);

    font-size:1rem;
  }

  /* ANIMATION */

  @keyframes fadeUp{

    from{

      opacity:0;

      transform:
      translateY(12px);
    }

    to{

      opacity:1;

      transform:
      translateY(0);
    }
  }

  /* TABLET */

  @media(max-width:768px){

    .kutub-title{

      font-size:2rem;
    }

    .kutub-image{

      height:190px;
    }

    .kutub-grid{

      gap:1.4rem;
    }
  }

  /* MOBILE */

  @media(max-width:480px){

    .kutub-title{

      font-size:1.6rem;
    }

    .kutub-sub{

      font-size:.9rem;
    }

    .kutub-image{

      height:160px;
    }

    .kutub-book{

      font-size:1rem;
    }

    .kutub-description{

      font-size:.84rem;
    }

    .kutub-search{

      font-size:.9rem;

      padding:.85rem 1rem;
    }
  }

`}</style>
    </div>
  );
};

export default Kutub;