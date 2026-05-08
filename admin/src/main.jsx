import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";
import "./index.css";

import { AdminProvider } from "./Context/AdminContext.jsx";
import { DuruusProvider } from "./Context/DuruusContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminProvider>
      <DuruusProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DuruusProvider>
    </AdminProvider>
  </React.StrictMode>
);
