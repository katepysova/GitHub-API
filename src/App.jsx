import React, { useEffect } from "react";
import { ISSUES_LS_KEY } from "@constants/constants.js";
import AppRouter from "@routes/Router.jsx";
import LocalStorage from "@common/localStorage.js";
import "@styles/main.scss";

export default function App() {
  useEffect(() => {
    const issues = LocalStorage.getItem(ISSUES_LS_KEY) || {};
    for (const url in issues) {
      const expTime = new Date(issues[url].expTime);
      const currentTime = new Date();
      if (expTime.getTime() <= currentTime.getTime()) {
        delete issues[url];
        LocalStorage.setItem(ISSUES_LS_KEY, issues);

        if (Object.keys(LocalStorage.getItem(ISSUES_LS_KEY)).length === 0) {
          LocalStorage.removeItem(ISSUES_LS_KEY);
        }
      }
    }
  }, []);

  return <AppRouter />;
}
