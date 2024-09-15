import React from "react";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import CourseList from "./components/CourseList.js";
// import VerifyOTP from "./components/VerifyOTP";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<CourseList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;