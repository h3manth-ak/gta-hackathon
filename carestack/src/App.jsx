import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="\" element={<Login />} />
          <Route path="\admin" element={<Admin />} />
          <Route path="\user" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
