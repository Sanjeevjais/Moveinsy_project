import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import FeedbackPage from "../pages/FeedbackPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import DriverDetailsPage from "../pages/DriverDetailsPage";
import { useAuthStore } from "../store/authStore";
import MyRidesPage from "../pages/MyRidesPage";
import Navbar from "../components/Navbar";
export default function AppRoutes() {
  const { isAuthenticated, role } = useAuthStore();

  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/" element={<MyRidesPage />} />
         {/* <Route path="/feedback" element={<FeedbackPage />} /> */}

        {isAuthenticated && role === "ADMIN" ? (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/drivers/:id" element={<DriverDetailsPage />} />
          </>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
