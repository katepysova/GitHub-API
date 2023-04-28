import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import routes from "@constants/routes.js";
import HomePage from "@pages/home.jsx";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route index path={routes.index} element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
