import React, { useState, useEffect, useRef } from "react";
import axios from "../utils/axiosConfig";
import Webcam from "react-webcam";
import AnimatedBackground from "../components/AnimatedBackground"; // Add this import

export default function StressDetection() {
  const [user, setUser] = useState({ name: "", age: "", gender: "" });
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  // Fetch user info on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.data && res.data.user) {
          setUser({
            name: res.data.user.name || "",
            age: res.data.user.age || "",
            gender: res.data.user.gender || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  // Image upload handler
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Capture webcam frame
  const captureFrame = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) return;
    setLoading(true);
    const blob = await fetch(imageSrc).then((res) => res.blob());

    const formData = new FormData();
    formData.append("image", blob, "webcam.jpg");

    try {
      const res = await axios.post("/stress/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to detect stress.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white px-4 py-8 relative overflow-hidden">
      <AnimatedBackground /> {/* Add animated background */}
      <div className="w-full max-w-2xl flex flex-col items-center relative z-10">
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
          <label className="flex flex-col items-center cursor-pointer">
            <span className="mb-2 px-4 py-2 bg-indigo-700 text-white rounded-xl font-semibold hover:bg-indigo-800 transition-all">
              Choose Image File
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={loading}
            />
          </label>
          <button
            type="submit"
            className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Detecting...
              </span>
            ) : (
              "Detect Stress from Image"
            )}
          </button>
        </form>

        {/* Live Webcam Section */}
        <div className="mb-6 flex flex-col items-center gap-4">
          {!isLive ? (
            <button
              onClick={() => setIsLive(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-xl font-semibold"
            >
              Start Live Webcam
            </button>
          ) : (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-xl border-2 border-indigo-500"
              />
              <div className="flex gap-4 mt-2">
                <button
                  onClick={captureFrame}
                  className={`px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Detecting...
                    </span>
                  ) : (
                    "Capture & Detect"
                  )}
                </button>
                <button
                  onClick={() => setIsLive(false)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl font-semibold"
                >
                  Stop Webcam
                </button>
              </div>
            </>
          )}
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
    </div>
  );
}
