import React, { useState } from "react";
import Login from "./views/login/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/dashboard/dashboard";


export default function App() {
const [loggedIn, setLoggedIn] = useState(false)


    return (
      <main>
        <Routes>
            <Route path='/' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/dashboard' element={<Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>            
        </Routes>
        <footer style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: "1rem",
        }}>
            Developed by Marco Sampaio
        </footer>
      </main>
    );
  }
