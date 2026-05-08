import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./styles.css";

/* EXISTING */
import { PublicProvider } from "./Context/PublicContext.jsx";
/* NEW */
import TafsiirPlayerProvider from "./Context/TafsiirPlayerContext.jsx";
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <PublicProvider>

      <BrowserRouter>

        <TafsiirPlayerProvider>

          <App />

        </TafsiirPlayerProvider>

      </BrowserRouter>

    </PublicProvider>

  </React.StrictMode>
);

/********************************
 SERVICE WORKER
********************************/
if ("serviceWorker" in navigator) {
  window.addEventListener(
    "load",
    () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() =>
          console.log(
            "✔️ Service Worker registered"
          )
        )
        .catch((err) =>
          console.log(
            "❌ SW registration failed:",
            err
          )
        );
    }
  );
}