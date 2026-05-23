import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";
import { FaBookOpen } from "react-icons/fa";

import { motion } from "framer-motion";

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

      {/* BACKGROUND GLOW */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>

      {/* LANTERNS */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3659/3659899.png"
        alt=""
        className="lantern lantern-left"
      />

      <img
        src="https://cdn-icons-png.flaticon.com/512/3659/3659899.png"
        alt=""
        className="lantern lantern-right"
      />

      {/* HERO */}
      <section className="hero">

        <motion.div
          initial={{ opacity:0, y:-20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7 }}
          className="moon-icon"
        >
          <HiOutlineMoon />
        </motion.div>

        <motion.h1
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7 }}
          className="kutub-title"
        >
          Kutubta uu akhriyey

          <span>
            Shiikh Cabdinaasir Xaaji Axmed
          </span>

        </motion.h1>

        <div className="divider"></div>

        <p className="kutub-sub">

          Waxaa kuugu diyaar ah dhammaan
          kutubtii uu akhriyey
          Shiikh Cabdinaasir Xaaji Axmed.

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

      </section>

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

          <section className="kutub-grid">

            {
              filteredBooks.map((book, i) => (

                <motion.div
                  initial={{
                    opacity:0,
                    y:40
                  }}

                  animate={{
                    opacity:1,
                    y:0
                  }}

                  transition={{
                    delay:i * 0.08
                  }}

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

                    <div className="image-overlay"></div>

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
                        book.description
                        ?.slice(0, 90)
                      || "Sharaxaad lama gelin"
                      }

                    </p>

                    <button className="details-btn">

                      <FaBookOpen />

                      <span>
                        عرض التفاصيل
                      </span>

                    </button>

                  </div>

                </motion.div>

              ))
            }

          </section>

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
        background:#090201;
      }

      .kutub-page{
        position:relative;
        min-height:100vh;
        overflow:hidden;

        padding:
        5rem
        1rem
        6rem;

        background:
        radial-gradient(
        circle at top,
        rgba(255,180,0,0.12),
        transparent 25%),

        linear-gradient(
        to bottom,
        #140402,
        #0d0201,
        #050101);

        color:white;
      }

      /* BG GLOW */
      .bg-glow{
        position:absolute;
        border-radius:50%;
        filter:blur(120px);
        z-index:0;
      }

      .glow-1{
        width:300px;
        height:300px;

        background:
        rgba(212,175,55,0.10);

        top:-50px;
        left:-100px;
      }

      .glow-2{
        width:280px;
        height:280px;

        background:
        rgba(255,140,0,0.08);

        bottom:0;
        right:-80px;
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

        background-size:35px 35px;

        opacity:0.18;

        pointer-events:none;
      }

      /* HERO */
      .hero{
        max-width:1100px;
        margin:auto;

        text-align:center;

        position:relative;
        z-index:2;
      }

      /* LANTERNS */
      .lantern{
        position:absolute;
        top:0;

        width:110px;

        z-index:5;

        opacity:0.95;

        animation:
        float 4s ease-in-out infinite;

        filter:
        drop-shadow(
        0 0 25px
        rgba(255,180,60,0.6));
      }

      .lantern-left{
        left:20px;
      }

      .lantern-right{
        right:20px;
      }

      @keyframes float{

        0%{
          transform:translateY(0px);
        }

        50%{
          transform:translateY(15px);
        }

        100%{
          transform:translateY(0px);
        }
      }

      /* MOON */
      .moon-icon{
        width:85px;
        height:85px;

        margin:auto;
        margin-bottom:1.5rem;

        border-radius:24px;

        display:flex;
        align-items:center;
        justify-content:center;

        background:
        linear-gradient(
        145deg,
        rgba(212,175,55,0.18),
        rgba(212,175,55,0.05));

        border:
        1px solid
        rgba(212,175,55,0.4);

        color:#d4af37;

        box-shadow:
        0 0 30px
        rgba(212,175,55,0.2);
      }

      .moon-icon svg{
        width:38px;
        height:38px;
      }

      /* TITLE */
      .kutub-title{
        font-size:4rem;
        font-weight:900;

        line-height:1.1;

        margin-bottom:0.8rem;

        color:white;

        text-shadow:
        0 0 20px
        rgba(255,255,255,0.05);
      }

      .kutub-title span{
        display:block;

        margin-top:0.4rem;

        color:#d4af37;
      }

      /* DIVIDER */
      .divider{
        width:280px;
        height:2px;

        margin:1.5rem auto;

        background:
        linear-gradient(
        to right,
        transparent,
        #d4af37,
        transparent);

        position:relative;
      }

      .divider::after{
        content:"✦";

        position:absolute;

        left:50%;
        top:50%;

        transform:
        translate(-50%,-50%);

        background:#0b0201;

        padding:0 14px;

        color:#d4af37;

        font-size:1.1rem;
      }

      /* SUBTITLE */
      .kutub-sub{
        color:#dddddd;

        font-size:1.05rem;

        line-height:1.8;

        max-width:700px;

        margin:
        auto
        auto
        2.5rem;
      }

      /* SEARCH */
      .search-wrap{
        display:flex;
        justify-content:center;
      }

      .search-box{
        width:100%;
        max-width:720px;

        position:relative;
      }

      .search-icon{
        position:absolute;

        left:22px;
        top:50%;

        transform:
        translateY(-50%);

        color:#d4af37;

        font-size:1.2rem;

        z-index:2;
      }

      .kutub-search{
        width:100%;

        padding:
        1.1rem
        1.4rem
        1.1rem
        58px;

        border-radius:999px;

        border:
        1px solid
        rgba(212,175,55,0.4);

        background:
        rgba(20,5,2,0.88);

        color:white;

        font-size:1rem;

        outline:none;

        transition:0.3s;

        backdrop-filter:blur(10px);

        box-shadow:
        inset 0 0 20px rgba(255,180,0,0.03),
        0 0 20px rgba(0,0,0,0.3);
      }

      .kutub-search::placeholder{
        color:#b8b8b8;
      }

      .kutub-search:focus{
        border-color:#d4af37;

        box-shadow:
        0 0 20px rgba(212,175,55,0.2);
      }

      /* GRID */
      .kutub-grid{
        margin-top:4rem;

        display:grid;

        grid-template-columns:
        repeat(auto-fit,minmax(260px,1fr));

        gap:1.4rem;

        max-width:1250px;

        margin-inline:auto;

        position:relative;
        z-index:2;
      }

      /* CARD */
      .kutub-card{
        position:relative;

        border-radius:28px;

        overflow:hidden;

        cursor:pointer;

        transition:0.4s ease;

        background:
        linear-gradient(
        to bottom,
        rgba(25,7,3,0.98),
        rgba(10,2,1,0.99));

        border:
        1px solid
        rgba(212,175,55,0.35);

        box-shadow:
        0 10px 35px rgba(0,0,0,0.4);
      }

      .kutub-card:hover{
        transform:
        translateY(-10px);

        border-color:#d4af37;

        box-shadow:
        0 20px 40px rgba(0,0,0,0.55),
        0 0 20px rgba(212,175,55,0.12);
      }

      /* IMAGE */
      .kutub-image{
        position:relative;
        height:200px;
        overflow:hidden;
      }

      .kutub-image img{
        width:100%;
        height:100%;

        object-fit:cover;

        transition:0.5s;
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
        rgba(0,0,0,0),
        rgba(0,0,0,0.55));
      }

      /* BOOK ICON */
      .book-icon{
        position:absolute;

        top:14px;
        left:14px;

        width:50px;
        height:50px;

        border-radius:16px;

        display:flex;
        align-items:center;
        justify-content:center;

        background:
        rgba(20,5,2,0.9);

        border:
        1px solid
        rgba(212,175,55,0.5);

        color:#d4af37;

        z-index:3;

        box-shadow:
        0 0 15px rgba(212,175,55,0.15);
      }

      .book-icon svg{
        width:22px;
        height:22px;
      }

      /* CONTENT */
      .kutub-content{
        padding:1.3rem;
        text-align:center;
      }

      .kutub-book{
        font-size:1.45rem;
        font-weight:800;

        color:white;

        margin-bottom:0.6rem;
      }

      .kutub-sheikh{
        color:#d4af37;

        font-size:0.95rem;
        font-weight:600;

        margin-bottom:0.8rem;
      }

      /* MINI DIVIDER */
      .mini-divider{
        width:100px;
        height:2px;

        margin:
        1rem auto;

        position:relative;

        background:
        linear-gradient(
        to right,
        transparent,
        #d4af37,
        transparent);
      }

      .mini-divider::after{
        content:"✦";

        position:absolute;

        left:50%;
        top:50%;

        transform:
        translate(-50%,-50%);

        background:#100301;

        padding:0 8px;

        color:#d4af37;

        font-size:0.9rem;
      }

      /* DESCRIPTION */
      .kutub-description{
        color:#dddddd;

        line-height:1.7;

        font-size:0.92rem;

        margin-bottom:1.4rem;

        min-height:70px;
      }

      /* BUTTON */
      .details-btn{
        width:100%;

        border:none;

        padding:0.95rem 1rem;

        border-radius:999px;

        background:
        linear-gradient(
        to right,
        #d4af37,
        #f4cf65);

        color:#140402;

        font-weight:800;

        font-size:0.95rem;

        cursor:pointer;

        display:flex;
        align-items:center;
        justify-content:center;
        gap:0.6rem;

        transition:0.3s;
      }

      .details-btn:hover{
        transform:scale(1.03);
      }

      /* BOTTOM */
      .bottom-divider{
        width:320px;
        height:2px;

        margin:
        4rem auto 0;

        background:
        linear-gradient(
        to right,
        transparent,
        #d4af37,
        transparent);

        position:relative;
      }

      .bottom-divider::after{
        content:"✦";

        position:absolute;

        left:50%;
        top:50%;

        transform:
        translate(-50%,-50%);

        background:#090201;

        padding:0 12px;

        color:#d4af37;
      }

      /* EMPTY */
      .kutub-loading,
      .kutub-empty{
        text-align:center;

        margin-top:4rem;

        color:#eee;

        font-size:1.1rem;
      }

      /* TABLET */
      @media(max-width:992px){

        .kutub-title{
          font-size:3rem;
        }

        .lantern{
          width:85px;
        }
      }

      /* MOBILE */
      @media(max-width:768px){

        .kutub-page{
          padding-top:6rem;
        }

        .kutub-title{
          font-size:2.2rem;
        }

        .kutub-sub{
          font-size:0.95rem;
        }

        .kutub-grid{
          grid-template-columns:
          repeat(auto-fit,minmax(220px,1fr));

          gap:1rem;
        }

        .kutub-image{
          height:180px;
        }

        .lantern{
          width:65px;
        }

        .lantern-left{
          left:8px;
        }

        .lantern-right{
          right:8px;
        }

        .divider,
        .bottom-divider{
          width:220px;
        }
      }

      /* SMALL MOBILE */
      @media(max-width:480px){

        .kutub-title{
          font-size:1.8rem;
        }

        .kutub-search{
          font-size:0.92rem;
        }

        .kutub-book{
          font-size:1.2rem;
        }

        .kutub-image{
          height:170px;
        }

        .moon-icon{
          width:75px;
          height:75px;
        }
      }

      `}</style>

    </div>
  );
};

export default Kutub;