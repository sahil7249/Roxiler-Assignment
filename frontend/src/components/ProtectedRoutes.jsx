import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">
        Loading…
      </div>
    );
  }
  if(!user) return <Navigate to="/login" replace />
  if(allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />

  return <>{children}</>
};

