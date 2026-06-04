import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterUserPage } from "./pages/RegisterUserPage";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<RegisterUserPage />} />
    <Route path="/login" element={<LoginPage />} />
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
