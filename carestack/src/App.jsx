import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";
import ChatButton from "./pages/ChatButton";
import  Dashboard  from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile";
import Announcement from "./pages/Announcement";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/chat" element={<ChatButton />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/announcement" element={<Announcement/>} /> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;
