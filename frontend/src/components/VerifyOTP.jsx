import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const [otp, setOtp] = useState(''); // For storing the OTP input
    const [error, setError] = useState(''); // For displaying error messages
    const { state } = useLocation(); // Get email from previous page (state is passed from sign-up page)
    const navigate = useNavigate(); // For redirection

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Send OTP verification request to your API
            const response = await fetch('http://localhost:8080/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: state.email, otp }), // Include email and OTP
            });

            const result = await response.json(); // Parse the API response

            if (response.ok) {
                // If OTP is correct, redirect to login page
                navigate('/login');
            } else {
                // If OTP is incorrect, show the error message
                setError(result.message || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            // Handle any errors during the request
            setError('Failed to verify OTP. Please try again.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
            <form onSubmit={handleVerifyOTP} className="bg-white p-6 shadow-md rounded-md">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Enter OTP</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="text-red-600 mb-2">{error}</div>} {/* Display error message if OTP is incorrect */}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                >
                    Verify OTP
                </button>
            </form>
        </div>
    );
};

export default VerifyOTP;
