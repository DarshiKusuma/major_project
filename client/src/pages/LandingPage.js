import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
      <AnimatedBackground />
      <div className="w-full max-w-lg flex flex-col items-center relative z-10">
  <h1 className="text-4xl font-bold mb-2 text-center whitespace-nowrap">Welcome to Smart Health Predictor</h1><br />
  <p className="mb-6 text-center whitespace-nowrap">Choose an option below to start monitoring your health and stress levels.</p>

        <div className="flex gap-6 mb-6 justify-center w-full">
          <button
            onClick={() => navigate("/health-advisor")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg flex-1"
          >
            Health Advisor
          </button>
          <button
            onClick={() => navigate("/live-stress")}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg flex-1"
          >
            Live Stress Predictor
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
