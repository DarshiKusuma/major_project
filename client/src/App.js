import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import LandingPage from "./pages/LandingPage";
import HealthAdvisor from "./pages/HealthAdvisor";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/landing" element={<ProtectedRoute><LandingPage /></ProtectedRoute>}/>
        <Route path="/health-advisor" element={<ProtectedRoute><HealthAdvisor /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
