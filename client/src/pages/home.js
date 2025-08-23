import React from "react";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-center px-4">
      
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Project Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
          AI-Based Smart Health & Lifestyle Monitoring
        </h1>

        {/* About */}
        <p className="text-gray-300 max-w-2xl mb-10 text-lg sm:text-xl drop-shadow-md">
          Take control of your health with AI-powered predictions, stress detection, and personalized lifestyle recommendations.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            to="/login" 
            className="px-10 py-4 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-transform duration-300 text-lg font-semibold shadow-md text-white"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-10 py-4 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-transform duration-300 text-lg font-semibold shadow-md text-white"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 text-gray-500 text-sm z-10">
        © 2025 Aurora Higher Education and Research Academy
      </div>
    </div>
  );
}
