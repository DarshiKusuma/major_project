import React from "react";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 overflow-hidden">
      
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
          AI-Based Smart Health & Lifestyle Monitoring
        </h1>
        <p className="text-gray-300 max-w-2xl mb-10 text-lg sm:text-xl leading-relaxed">
          Empower your health with AI-powered predictions, stress detection, and personalized lifestyle recommendations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/login" 
            className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg text-lg font-semibold"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-8 py-4 rounded-2xl bg-green-600 hover:bg-green-500 transition-all duration-300 shadow-lg text-lg font-semibold"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 text-gray-500 text-sm z-10">
        © 2025 Developed By Parvathpur Model కుసుమ దర్శి All rights reserved. 
      </div>
    </div>
  );
}
