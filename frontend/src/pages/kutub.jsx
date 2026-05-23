import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";
import { FaBookOpen } from "react-icons/fa";

const API =
`${import.meta.env.VITE_API_URL}/api/duruus/books`;

const Kutub = () => {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* FETCH BOOKS */
  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const res = await fetch(API);
        const data = await res.json();

        setBooks(
          (data.books || []).filter(
            (book) => book.isActive
          )
        );

      } catch (error) {

        console.error(
          "Failed to load books:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchBooks();

  }, []);

  /* SEARCH FILTER */
  const filteredBooks = books.filter(
    (book) =>
      book.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      book.sheikhName
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <div className="kutub-page">

      {/* LANTERNS */}
      <div className="lantern lantern-left">
        🏮
      </div>

      <div className="lantern lantern-right">
        🏮
      </div>

      {/* HERO */}
      <div className="hero">

        <div className="moon-icon">
          <HiOutlineMoon />
        </div>

        <h1 className="kutub-title">
          Kutubta uu akhriyey
          <span>
            Shiikh Cabdinaasir Xaaji Axmed
          </span>
        </h1>

        <div className="divider"></div>

        <p className="kutub-sub">
          Waxaa kuugu diyaar ah dhammaan
          kutubtii uu akhriyey
          shiikh cabdinaasir xaaji axmed.
        </p>

        {/* SEARCH */}
        <div className="search-wrap">

          <div className="search-box">

            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Raadi kitaab ama sheikh..."
              className="kutub-search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

      </div>

      {/* BOOKS */}
      {
        loading ? (

          <p className="kutub-loading">
            Loading...
          </p>

        ) : filteredBooks.length === 0 ? (

          <p className="kutub-empty">
            Ma jiro kitaab la helay
          </p>

        ) : (

          <div className="kutub-grid">

            {
              filteredBooks.map((book) => (

                <div
                  key={book._id}
                  className="kutub-card"
                  onClick={() =>
                    navigate(`/kutub/${book._id}`)
                  }
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
                      <FaBookOpen />
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
                      {
                        book.description ||
                        "Sharaxaad lama gelin"
                      }
                    </p>

                    <button className="details-btn">
                      عرض التفاصيل
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

      <div className="bottom-divider"></div>

      {/* CSS */}
      <style>{`

      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:'Poppins',sans-serif;
      }

      body{
        background:#140402;
      }

      .kutub-page{
        position:relative;
        min-height:100vh;
        padding:4rem 1.2rem 6rem;
        overflow:hidden;

        background:
        radial-gradient(circle at top,
        rgba(255,170,0,0.08),
        transparent 35%),

        linear-gradient(
        to bottom,
        #1b0703,
        #120301,
        #080101);

        color:white;
      }

      /* PATTERN */
      .kutub-page::before{
        content:"";
        position:absolute;
        inset:0;

        background-image:
        radial-gradient(
        rgba(212,175,55,0.05) 1px,
        transparent 1px);

        background-size:38px 38px;

        opacity:0.25;
        pointer-events:none;
      }

      /* LANTERNS */
      .lantern{
        position:absolute;
        top:0;
        font-size:5.8rem;
        z-index:10;

        animation:float 3s ease-in-out infinite;

        filter:
        drop-shadow(0 0 25px rgba(255,180,60,0.7));
      }

      .lantern-left{
        left:28px;
      }

      .lantern-right{
        right:28px;
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
        max-width:1100px;
        margin:auto;
        text-align:center;
        position:relative;
        z-index:2;
      }

      .moon-icon{
        width:90px;
        height:90px;

        margin:auto;
        margin-bottom:1.8rem;

        border-radius:24px;

        display:flex;
        align-items:center;
        justify-content:center;

        background:
        linear-gradient(
        145deg,
        rgba(212,175,55,0.15),
        rgba(212,175,55,0.04));

        border:1px solid rgba(212,175,55,0.4);

        color:#d4af37;

        box-shadow:
        0 0 35px rgba(212,175,55,0.2);
      }

      .moon-icon svg{
        width:38px;
        height:38px;
      }

      /* TITLE */
      .kutub-title{
        font-size:4.3rem;
        line-height:1.1;
        font-weight:900;

        margin-bottom:0.4rem;

        color:white;

        text-shadow:
        0 0 25px rgba(255,255,255,0.08);
      }

      .kutub-title span{
        display:block;
        color:#d4af37;

        margin-top:0.3rem;
      }

      /* GOLD DIVIDER */
      .divider{
        width:300px;
        height:2px;

        margin:1.8rem auto;

        position:relative;

        background:
        linear-gradient(
        to right,
        transparent,
        #d4af37,
        transparent);
      }

      .divider::after{
        content:"✿";

        position:absolute;
        left:50%;
        top:50%;

        transform:
        translate(-50%,-50%);

        background:#140402;

        padding:0 14px;

        color:#d4af37;
        font-size:1.4rem;
      }

      /* SUBTITLE */
      .kutub-sub{
        color:#d5d5d5;
        font-size:1.1rem;
        line-height:1.7;

        margin-bottom:2.5rem;
      }

      /* SEARCH */
      .search-wrap{
        display:flex;
        justify-content:center;
      }

      .search-box{
        position:relative;
        width:100%;
        max-width:760px;
      }

      .search-icon{
        position:absolute;
        left:22px;
        top:50%;

        transform:translateY(-50%);

        color:#d4af37;

        font-size:1.2rem;

        z-index:2;
      }

      .kutub-search{
        width:100%;

        padding:
        1.2rem
        1.6rem
        1.2rem
        60px;

        border-radius:999px;

        border:1.5px solid rgba(212,175,55,0.45);

        background:
        rgba(25,7,3,0.9);

        outline:none;

        color:white;
        font-size:1rem;

        box-shadow:
        inset 0 0 20px rgba(212,175,55,0.04),
        0 0 25px rgba(0,0,0,0.35);

        transition:0.3s;
      }

      .kutub-search::placeholder{
        color:#bdbdbd;
      }

      .kutub-search:focus{
        border-color:#d4af37;

        box-shadow:
        0 0 25px rgba(212,175,55,0.2);
      }

      /* GRID */
      .kutub-grid{
        margin-top:4rem;

        display:grid;

        grid-template-columns:
        repeat(auto-fit,minmax(320px,1fr));

        gap:2rem;

        position:relative;
        z-index:2;
      }

      /* CARD */
      .kutub-card{
        background:
        linear-gradient(
        to bottom,
        rgba(25,7,3,0.96),
        rgba(10,2,1,0.98));

        border-radius:30px;

        overflow:hidden;

        border:1.5px solid rgba(212,175,55,0.45);

        cursor:pointer;

        transition:0.4s ease;

        box-shadow:
        0 10px 35px rgba(0,0,0,0.45);

        position:relative;
      }

      .kutub-card:hover{
        transform:translateY(-10px);

        box-shadow:
        0 20px 45px rgba(0,0,0,0.6),
        0 0 25px rgba(212,175,55,0.15);
      }

      /* IMAGE */
      .kutub-image{
        position:relative;
        height:250px;
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

      /* BOOK ICON */
      .book-icon{
        position:absolute;
        top:15px;
        left:15px;

        width:58px;
        height:58px;

        border-radius:18px;

        display:flex;
        align-items:center;
        justify-content:center;

        background:
        rgba(20,5,2,0.9);

        border:1px solid rgba(212,175,55,0.5);

        color:#d4af37;

        z-index:5;

        box-shadow:
        0 0 20px rgba(212,175,55,0.2);
      }

      .book-icon svg{
        width:28px;
        height:28px;
      }

      /* CONTENT */
      .kutub-content{
        padding:1.7rem;
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

      /* MINI DIVIDER */
      .mini-divider{
        width:120px;
        height:2px;

        margin:1rem auto 1.2rem;

        position:relative;

        background:
        linear-gradient(
        to right,
        transparent,
        #d4af37,
        transparent);
      }

      .mini-divider::after{
        content:"✿";

        position:absolute;
        left:50%;
        top:50%;

        transform:
        translate(-50%,-50%);

        background:#140402;

        padding:0 10px;

        color:#d4af37;
        font-size:1rem;
      }

      .kutub-description{
        color:#dddddd;
        line-height:1.8;
        font-size:0.98rem;

        margin-bottom:1.8rem;
      }

      /* BUTTON */
      .details-btn{
        background:transparent;

        border:1px solid rgba(212,175,55,0.5);

        color:#d4af37;

        padding:0.95rem 1.7rem;

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

      /* BOTTOM DIVIDER */
      .bottom-divider{
        width:350px;
        height:2px;

        margin:4rem auto 0;

        position:relative;

        background:
        linear-gradient(
        to right,
        transparent,
        #d4af37,
        transparent);
      }

      .bottom-divider::after{
        content:"✿";

        position:absolute;
        left:50%;
        top:50%;

        transform:
        translate(-50%,-50%);

        background:#140402;

        padding:0 14px;

        color:#d4af37;
        font-size:1.5rem;
      }

      /* LOADING */
      .kutub-loading,
      .kutub-empty{
        text-align:center;
        margin-top:4rem;

        color:#eee;
        font-size:1.1rem;
      }

      /* MOBILE */
      @media(max-width:768px){

        .kutub-title{
          font-size:2.7rem;
        }

        .lantern{
          font-size:4rem;
        }

        .lantern-left{
          left:10px;
        }

        .lantern-right{
          right:10px;
        }

        .kutub-grid{
          grid-template-columns:1fr;
        }

        .kutub-image{
          height:220px;
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
          padding:
          1rem
          1rem
          1rem
          55px;
        }

        .kutub-book{
          font-size:1.5rem;
        }

        .kutub-image{
          height:200px;
        }

        .divider,
        .bottom-divider{
          width:220px;
        }
      }

      `}</style>

    </div>
  );
};

export default Kutub;