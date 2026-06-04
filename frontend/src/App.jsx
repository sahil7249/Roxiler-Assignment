import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterUserPage } from "./pages/RegisterUserPage";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<RegisterUserPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route  path="/admin/dashboard" element={
      <ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>
    }/>
  </Routes>
);

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};
