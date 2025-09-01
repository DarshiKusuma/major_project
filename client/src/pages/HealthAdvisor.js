import React, { useEffect, useMemo, useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import axios from "../utils/axiosConfig";
import {
  diseasesData,
  computeReport,
} from "../utils/healthAdvisorLogic";

export default function HealthAdvisor() {
  // Autofill from DB
  const [profile, setProfile] = useState({ name: "", gender: "", age: "" });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errProfile, setErrProfile] = useState("");

  // Inputs
  const diseaseKeys = useMemo(() => Object.keys(diseasesData), []);
  const [selected, setSelected] = useState([]);
  const [activity, setActivity] = useState("medium");
  const [stress, setStress] = useState("low");

  // Output
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  // Logout
  const navigate = window.reactRouterNavigate || ((url) => window.location.href = url); // fallback for navigate
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // TODO: adjust endpoint if needed: /auth/me or /user/profile
    useEffect(() => {
      const loadProfile = async () => {
        setLoadingProfile(true);
        setErrProfile("");
        try {
          const res = await axios.get("/user/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          if (res.data && res.data.user) {
            setProfile({
              name: res.data.user.name || "",
              gender: res.data.user.gender || "",
              age: res.data.user.age || ""
            });
          } else {
            setErrProfile("Could not load profile data.");
          }
        } catch (e) {
          setErrProfile(e.response?.data?.error || "Failed to load profile");
        } finally {
          setLoadingProfile(false);
        }
      };
      loadProfile();
    }, []);

  const toggleDisease = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  };

  const handleGenerate = () => {
    setError("");
    setReport(null);

    if (!profile.name || !profile.gender || !profile.age) {
      setError("Profile incomplete. Please ensure name, gender, and age are set.");
      return;
    }
    if (selected.length === 0) {
      setError("Please select at least one disease/risk.");
      return;
    }
    const r = computeReport({
      name: profile.name,
      age: Number(profile.age),
      gender: profile.gender,
      diseases: selected,
      activityLevel: activity,
      stressLevel: stress,
    });
    setReport(r);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
      <AnimatedBackground />

      {/* Logout button at top right corner */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-8 z-20 bg-red-600 hover:bg-red-500 rounded-full p-3 shadow-lg flex items-center justify-center"
        title="Log out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
        </svg>
      </button>

      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
          🩺 Health Advisor
        </h1>

        {/* Profile */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-4 shadow">
            <label className="text-sm text-gray-300">Name</label>
            <input
              disabled
              value={profile.name}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-700 text-white"
              placeholder={loadingProfile ? "Loading..." : "Name"}
            />
          </div>
          <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-4 shadow">
            <label className="text-sm text-gray-300">Gender</label>
            <input
              disabled
              value={profile.gender}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-700 text-white"
              placeholder={loadingProfile ? "Loading..." : "Gender"}
            />
          </div>
          <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-4 shadow">
            <label className="text-sm text-gray-300">Age</label>
            <input
              disabled
              value={profile.age}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-700 text-white"
              placeholder={loadingProfile ? "Loading..." : "Age"}
            />
          </div>
        </div>

        {errProfile && (
          <p className="text-red-400 text-center mb-4">{errProfile}</p>
        )}

        {/* Controls */}
        <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Select Your Conditions</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {diseaseKeys.map((k) => (
              <label
                key={k}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border border-gray-700 ${
                  selected.includes(k) ? "bg-gray-700" : "bg-gray-900"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(k)}
                  onChange={() => toggleDisease(k)}
                />
                <span>{k}</span>
              </label>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-sm text-gray-300">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-700 text-white"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-300">Stress Level</label>
              <select
                value={stress}
                onChange={(e) => setStress(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-700 text-white"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          <button
            onClick={handleGenerate}
            className="mt-6 px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-500 font-semibold"
          >
            Generate Health Report
          </button>
        </div>

        {/* Report */}
        {report && (
          <div className="space-y-6">
            <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow">
              <h3 className="text-2xl font-bold mb-2">Personalized Health Report</h3>
              <p className="text-gray-300">
                👤 <b>{report.header.name}</b> &nbsp;|&nbsp; Age: {report.header.age} &nbsp;|&nbsp; Gender: {report.header.gender}
              </p>
              <p className="mt-1 text-gray-300">
                📋 Diseases Selected: {report.header.diseases.join(", ")}
              </p>
              <p className="mt-2 text-lg">
                ⚠ Risk Level: <span className="font-extrabold">{report.header.risk}</span>
              </p>
            </div>

            <Section title="🚫 Foods to Avoid" items={report.foods_to_avoid} />
            <Section title="✅ Recommended Foods" items={report.recommended_foods} />
            <Bullets title="💡 Lifestyle Health Tips" items={report.health_tips} />
            <Bullets title="🩺 Medical Checkup Reminders" items={report.checkups} />
            <Bullets title="❌ Do’s & Don’ts" items={report.donts} />
            <Bullets title="⚠ Emergency Warning Signs" items={report.warnings} />
            <Bullets title="🧘 Mental Wellness Tip" items={report.mental_tips} />
            <Bullets title="🕒 Suggested Daily Routine" items={report.routine} />
            <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow">
              <p className="text-lg">{report.motivation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-200">{items.join(", ")}</p>
    </div>
  );
}

function Bullets({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <ul className="list-disc pl-6 space-y-1 text-gray-200">
        {items.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </div>
  );
}
