import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";
import "virtual:uno.css";

axios.defaults.baseURL = "https://hacker-news.firebaseio.com/v0/";

import Nav from "./components/Nav.tsx";
import Footer from "./components/Footer.tsx";
import IndexPage from "./pages/index.tsx";
import ItemPage from "./pages/item.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <div className="route-page">
        <Routes>
          <Route
            index
            element={<IndexPage />}
          />

          <Route
            path="item/:id"
            element={<ItemPage />}
          />

          <Route
            path="*"
            element={<div>404</div>}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
