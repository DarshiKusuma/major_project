import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

export default function StressDetection() {
  const [user, setUser] = useState({ name: "", age: "", gender: "" });
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Fetch user info on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/me"); // Your backend endpoint to get logged-in user's info
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("/stress/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to detect stress.");
      setResult(null);
    }
  };

  // Handle live webcam detection
  const handleLiveDetection = async () => {
    try {
      await axios.get("/stress/live");
      alert("Live stress detection ended (check your webcam window).");
    } catch (err) {
      alert(err.response?.data?.error || "Unable to start live detection.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">🌿 Live Stress Detection</h2>

      {/* User Info */}
      <div className="mb-6 bg-gray-800 p-4 rounded-xl w-full max-w-md">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
      </div>

      {/* Image Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-gray-800 p-4 rounded-xl w-full max-w-md flex flex-col gap-4"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold"
        >
          Detect Stress from Image
        </button>
      </form>

      {/* Live Webcam */}
      <div className="mb-6">
        <button
          onClick={handleLiveDetection}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-xl font-semibold"
        >
          Start Live Webcam Detection
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-gray-800 p-4 rounded-xl w-full max-w-md">
          <h3 className="text-xl font-bold mb-2">Detection Result:</h3>
          <p><strong>Detected Emotion:</strong> {result.detected_emotion}</p>
          <p><strong>Stress Level:</strong> {result.stress_level}</p>
        </div>
      )}

      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}
