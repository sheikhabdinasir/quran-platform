import React from "react";
import {
  Link
} from "react-router-dom";

const AdminNotFound = () => {
  return (
    <section style={styles.wrap}>

      <div style={styles.card}>

        <div style={styles.code}>
          404
        </div>

        <h1 style={styles.title}>
          Admin Page Not Found
        </h1>

        <p style={styles.text}>
          Boggaan admin-ka kuma jiro.
          
hubi qoraalkaag        </p>

        <Link
          to="/dashboard"
          style={styles.btn}
        >
          ⬅ Dashboard
        </Link>

      </div>

    </section>
  );
};

const styles = {

wrap:{
minHeight:"85vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"2rem",
background:"#FFF8F3"
},

card:{
background:"#fff",
padding:"3rem 2rem",
borderRadius:"24px",
textAlign:"center",
boxShadow:
"0 20px 45px rgba(0,0,0,.12)",
maxWidth:"520px",
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
padding:".9rem 1.5rem",
borderRadius:"999px",
background:"#2C1810",
color:"#FFF8F3",
fontWeight:"800",
textDecoration:"none"
}

};

export default AdminNotFound;