// src/components/VerifyOTP.js

import React, { useState } from "react";
import axios from "axios";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  
  const email = localStorage.getItem("userEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Server Error");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </div>
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOTP;
