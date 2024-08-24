import React, { useEffect, useState } from "react";
import Login from "./views/login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./views/dashboard/dashboard";
import { UserInterface } from "./utils/models";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const nav = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      nav("dashboard");
    } else {
      nav("/");
    }
  }, [loggedIn, nav]);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />}
        />
        <Route
          path="/history"
          element={<Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />}
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
