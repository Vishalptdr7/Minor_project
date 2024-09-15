import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'student',
  });
  
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages

    try {
      // Send registration request
      const response = await axios.post('http://localhost:8080/auth/register', formData);

      // If registration is successful, move to OTP step
      setStep(2);
      setSuccessMessage('Registration successful! Email sent for verification.');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Verify the OTP
      const response = await axios.post('http://localhost:8080/auth/verify-otp', {
        email: formData.email,
        otp,
      });

      setSuccessMessage('OTP verified successfully! Registration complete.');
      alert('OTP verified successfully. You can now log in.');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid OTP, please try again.');
    }
  };

  return (
    <div>
      {step === 1 ? (
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Register</button>
          {/* Error and Success Messages */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
      ) : (
        <form onSubmit={handleOtpVerify}>
          <h2>Verify OTP</h2>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
          {/* Error and Success Messages */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Register;
