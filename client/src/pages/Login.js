import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import axios from "../utils/axiosConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/auth/login", { email, password });
      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      navigate("/landing");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 overflow-hidden">
      
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button 
            type="submit"
            className="px-4 py-3 mt-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 font-semibold"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col mt-4 text-sm text-gray-300 space-y-2">
          <Link to="/forgot-password" className="hover:text-indigo-400">Forgot Password?</Link>
          <Link to="/register" className="hover:text-green-400">Don't have an account? Click Here</Link>
        </div>
      </div>

    </div>
  );
}
