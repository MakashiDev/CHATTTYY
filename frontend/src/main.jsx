import React from "react";
import ReactDOM from "react-dom";

import Login from "./login";
import Chat from "./chat";

import "./index.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Chat />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
