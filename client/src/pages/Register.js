import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import PasswordValidation from "../components/PasswordValidation";
import axios from "../utils/axiosConfig";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic front-end validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/auth/register", {
        name, email, gender, password
      });
      setSuccess(response.data.message || "Registered successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password validation live */}
          <PasswordValidation password={password} confirmPassword={confirmPassword} />

          <button
            type="submit"
            className="px-4 py-3 mt-2 rounded-2xl bg-green-600 hover:bg-green-500 transition-all duration-300 font-semibold"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-300">
          <Link to="/login" className="hover:text-indigo-400">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
