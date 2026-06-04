import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterUserPage } from "./pages/RegisterUserPage";
import { AuthProvider } from "./context/AuthContext";

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<RegisterUserPage />} />
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
