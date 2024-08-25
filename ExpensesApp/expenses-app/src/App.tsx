import React, { useEffect, useState } from "react";
import Login from "./views/login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./views/dashboard/dashboard";
import History from "./views/history/history";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('loggedIn') === "true" || loggedIn ) {
      setLoggedIn(true);
    } else {
      nav("/");
    }
  }, [loggedIn, nav]);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard setLoggedIn={setLoggedIn}/>}
        />
        <Route
          path="/history"
          element={<History setLoggedIn={setLoggedIn}/>}
        />
      </Routes>
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: "1rem",
        }}
      >
        Developed by Marco Sampaio
      </footer>
    </main>
  );
}
