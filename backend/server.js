import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

/* ================= ROUTES ================= */

import adminRoute from "./routes/adminRoute.js";
import lectureRoute from "./routes/lectureRoutes.js";
import duruusRoute from "./routes/duruusRoute.js";
import bookRoutes from "./routes/bookRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import tafsiirRoute from "./routes/tafsiirRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

/* ================= CONFIG ================= */

dotenv.config({ path:"./.env" });

const app = express();


/* ================= STATIC FILES ================= */

app.use(
  "/uploads",
  express.static("uploads")
);



/* ================= CORS ================= */

app.use(cors());

/* ================= BODY PARSER ================= */

app.use(express.json());

app.use(
  express.urlencoded({
    extended:true
  })
);

/* ================= DATABASE ================= */

mongoose
  .connect(process.env.MONGO_URI)

  .then(() =>
    console.log(
      "✅ MongoDB Connected Successfully"
    )
  )

  .catch((err) =>
    console.error(
      "❌ MongoDB Connection Error:",
      err.message
    )
  );

/* ================= ROUTES ================= */

/* ADMIN */
app.use(
  "/api/admin",
  adminRoute
);

/* LECTURES */
app.use(
  "/api/lectures",
  lectureRoute
);

/* DASHBOARD */
app.use(
  "/api/dashboard",
  dashboardRoutes
);

/*
IMPORTANT:
bookRoutes must come BEFORE generic duruusRoute
so multer handles multipart/form-data correctly
*/

/* BOOKS */
app.use(
  "/api/duruus/books",
  bookRoutes
);

/* LESSONS */
app.use(
  "/api/duruus/lessons",
  lessonRoutes
);

/* TAFSIIR */
app.use(
  "/api/tafsiir",
  tafsiirRoute
);

/* GENERIC DURUUS */
app.use(
  "/api/duruus",
  duruusRoute
);

/* ================= TEST ================= */

app.get("/", (req,res) => {

  res.json({

    success:true,

    message:
    "🚀 Tafsiir Qur'aan API is running",

  });

});

/* ================= START ================= */

const PORT =
process.env.PORT || 4000;

app.listen(PORT, () => {

  console.log(
    `🚀 Backend server running on port ${PORT}`
  );

});