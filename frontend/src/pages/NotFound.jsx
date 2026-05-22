import React from "react";
import {
  Link
} from "react-router-dom";

const NotFound = () => {
  return (
    <section style={styles.wrap}>

      <div style={styles.card}>

        <div style={styles.code}>
          404
        </div>

        <h1 style={styles.title}>
          Lama Helin Boggaan
        </h1>

        <p style={styles.text}>
          Page-kan ma jiro ama
        </p>

        <Link
          to="/"
          style={styles.btn}
        >
          ⬅ Ku Noqo Home
        </Link>

      </div>

    </section>
  );
};

const styles = {

wrap:{
minHeight:"80vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"2rem",
background:"#52d615"
},

card:{
background:"#ffffff",
padding:"3rem 2rem",
borderRadius:"24px",
textAlign:"center",
boxShadow:
"0 20px 40px rgba(0,0,0,.12)",
maxWidth:"500px",
width:"100%",
borderTop:"6px solid #D4AF37"
},

code:{
fontSize:"5rem",
fontWeight:"900",
color:"#D4AF37",
lineHeight:"1"
},

title:{
fontSize:"2rem",
marginTop:"1rem",
color:"#2C1810"
},

text:{
marginTop:".7rem",
fontSize:"1rem",
color:"#555",
lineHeight:"1.6"
},

btn:{
display:"inline-block",
marginTop:"1.5rem",
padding:".9rem 1.4rem",
borderRadius:"999px",
background:"#D4AF37",
color:"#2C1810",
fontWeight:"800",
textDecoration:"none"
}

};

export default NotFound;