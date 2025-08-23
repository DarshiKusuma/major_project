import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import axios from "../utils/axiosConfig";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await axios.post("/auth/forgot-password", { email });
      setMessage(response.data.message || "Reset link sent to your email!");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 overflow-hidden">
      
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>

        {message && <p className="text-green-400 text-center mb-4">{message}</p>}
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-3 mt-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 font-semibold"
          >
            Send Reset Link
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
