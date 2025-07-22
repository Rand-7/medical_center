// src/App.jsx
import { Routes, Route } from "react-router-dom"; // فقط هدول
import { useState } from "react";
import HomePage from "./Pages/HomePage";
import RegisterForm from "./Pages/RegisterForm";
import LoginForm from "./Pages/LoginForm";
import LoadingPage from "./components/loadingpage";
import SpecialtyDoctorsPage from "./Pages/SpecialtyDoctorsPage";
import BookingPage from "./Pages/BookingPage"; 
import DoctorDashboard from "./Pages/DoctorDashboard";
import PatientProfile from "./Pages/PatientProfile";

function App() {
  const [loading, setLoading] = useState(true);

  const handleFinishLoading = () => {
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoadingPage onFinish={handleFinishLoading} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/specialty/:specialtyId" element={<SpecialtyDoctorsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientProfile />} />
        </Routes>
      )}
    </>
  );
}

export default App;
