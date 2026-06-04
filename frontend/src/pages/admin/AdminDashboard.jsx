import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, NavBar, PageWrapper, StatCard } from "../../components/Ui";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api/api";

export const AdminDashboard = () => {
  const { user,logOut } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.admin
      .getStats()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const navLinks = [
    { label: "Dashboard", onClick: () => navigate("/admin/dashboard") },
    { label: "Users", onClick: () => navigate("/admin/users") },
    { label: "Stores", onClick: () => navigate("/admin/stores") },
  ];

  return (
    <div>
      <NavBar
        userName={user?.name ?? ""}
        role="Administrator"
        onLogOut={() => {
            console.log("Clickedd....")
          logOut();
          navigate("/login");
        }}
        links={navLinks}
      />
      <PageWrapper
        title="Dashboard"
        action={
          <Button onClick={() => navigate("/admin/users/new")} size="sm">
            + Add User
          </Button>
        }
      >
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-lg p-6 animate-pulse"
              >
                <div className="h-3 bg-slate-100 rounded w-24 mb-3" />
                <div className="h-8 bg-slate-100 rounded w-16" />
              </div>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Total Users" value={stats.totalUsers} />
            <StatCard label="Total Stores" value={stats.totalStores} />
            <StatCard label="Total Ratings" value={stats.totalRatings} />
          </div>
        ) : null}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/admin/users")}
            className="bg-white border border-slate-200 rounded-lg p-5 text-left hover:border-slate-400 transition-colors group"
          >
            <p className="font-semibold text-slate-900 group-hover:underline">
              Manage Users
            </p>
            <p className="text-sm text-slate-500 mt-1">
              View, filter, and add normal and admin users
            </p>
          </button>
          <button
            onClick={() => navigate("/admin/stores")}
            className="bg-white border border-slate-200 rounded-lg p-5 text-left hover:border-slate-400 transition-colors group"
          >
            <p className="font-semibold text-slate-900 group-hover:underline">
              Manage Stores
            </p>
            <p className="text-sm text-slate-500 mt-1">
              View and add stores on the platform
            </p>
          </button>
        </div>
      </PageWrapper>
    </div>
  );
};
