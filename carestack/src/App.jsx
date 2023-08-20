import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";
import AddEmployee from "./pages/AddEmployee";
import AssignWork from "./pages/AssignWork";
import AdminAnnouncement from "./pages/AdminAnnouncement";
import JobCatalogue from "./pages/JobCatalogue";
import JobLog from "./pages/JobLog";
import ChatButton from "./pages/ChatButton";
import Dashboard from "./pages/Dashboard.jsx";
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
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/assignwork" element={<AssignWork />} />
          <Route
            path="/admin/adminannouncement"
            element={<AdminAnnouncement />}
          />
          <Route path="/admin/jobcata" element={<JobCatalogue />} />
          <Route path="/admin/joblog" element={<JobLog />} />
          <Route path="/chat" element={<ChatButton />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/announcement" element={<Announcement />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;