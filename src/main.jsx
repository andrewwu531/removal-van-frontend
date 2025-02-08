// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Define your route for the homepage */}
        <Route path="/" element={<App />} />
        {/* You can add more routes here as your application grows */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
