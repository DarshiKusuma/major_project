import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Smart Health Predictor</h1>
      <p className="mb-6">
        Choose an option below to start monitoring your health and stress levels.
      </p>

      <div className="flex gap-6 mb-6">
        <button
          onClick={() => navigate("/health-prediction")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg"
        >
          Health Prediction
        </button>
        <button
          onClick={() => navigate("/live-stress")}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg"
        >
          Live Stress Predictor
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default LandingPage;
