import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleVerifyClick = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.get(`${API_URL}/auth/verify/${token}`);
      // If success, user is now verified
      setMessage(res.data.message || "Email verified successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const msg = String(err.response?.data?.message || "Verification failed");
      const lowerMsg = msg.toLowerCase();
      console.log("[DEBUG] Verification error:", msg);

      if (lowerMsg.includes("already verified")) {
        setMessage("Your email is already verified. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else if (lowerMsg.includes("expired") || lowerMsg.includes("invalid")) {
        setMessage("Verification link expired or invalid. Please enter your email to resend the link.");
        setExpired(true);
      } else if (lowerMsg.includes("user not found")) {
        setMessage("User not found. Redirecting to registration...");
        setTimeout(() => navigate("/register"), 2000);
      } else {
        setMessage(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    setEmailLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/resend-verification`, { email });
      const msg = String(res.data?.message || "Verification email resent!");
      if (msg.toLowerCase().includes("already verified")) {
        setMessage("Your email is already verified. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Verification email resent! Please check your inbox. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (err) {
      const msg = String(err.response?.data?.message || "Error resending link.");
      console.log("[DEBUG] Resend error:", msg);
      if (msg.toLowerCase().includes("user not found")) {
        setMessage("User not found. Redirecting to registration...");
        setTimeout(() => navigate("/register"), 2000);
      } else if (msg.toLowerCase().includes("already verified")) {
        setMessage("Your email is already verified. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(msg);
      }
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      {message && (
        <div className="mb-4 text-center text-yellow-300 font-semibold animate-pulse">{message}</div>
      )}
      {!expired ? (
        <button
          className={`bg-green-600 hover:bg-green-700 px-6 py-2 rounded flex items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleVerifyClick}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
              Verifying...
            </span>
          ) : "Verify Email"}
        </button>
      ) : (
        <form onSubmit={handleResendVerification} className="flex flex-col items-center">
          <label htmlFor="email" className="mb-2">Enter your email to resend verification link:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mb-4 px-4 py-2 rounded text-black"
            required
            disabled={emailLoading}
          />
          <button
            type="submit"
            className={`bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center justify-center ${emailLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={emailLoading}
          >
            {emailLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                Resending...
              </span>
            ) : "Resend Verification Link"}
          </button>
        </form>
      )}
    </div>
  );
};

export default VerifyEmail;
