import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import PasswordValidation from "../components/PasswordValidation";
import axios from "../utils/axiosConfig";

export default function ResetPassword() {
  const { token } = useParams(); // token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      setSuccess(response.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 overflow-hidden">
      
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Live Password Validation */}
          <PasswordValidation password={password} confirmPassword={confirmPassword} />

          <button
            type="submit"
            className={`px-4 py-3 mt-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 font-semibold flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Changing Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-300">
          <Link to="/login" className="hover:text-indigo-400">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
