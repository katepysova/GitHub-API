import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "@constants/routes.js";
import HomePage from "@pages/home.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={routes.index} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
