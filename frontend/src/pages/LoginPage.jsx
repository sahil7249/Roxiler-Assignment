import { useState } from "react";
import { Alert, Button, Input } from "../components/Ui";
import { Link } from "react-router-dom";
import { validateEmail } from "../utils/validator";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const { user, login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(form.email);
    const passwordError =
      form.password.trim() === " " ? "Password is required" : null;
    setErrors({
      email: emailError ?? "",
      password: passwordError ?? "",
    });
    if (emailError || passwordError) {
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (error) {
      setApiError(error.message || "Login failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            RateStore
          </h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            {apiError && <Alert message={apiError} />}

            <Input
              id="email"
              label="Email"
              type="email"
              onChange={(e) => {
                setForm((p) => ({ ...p, email: e.target.value }));
              }}
              error={errors.email}
              placeholder="you@example.com"
            />
            <Input
              id="password"
              label="Password"
              type="password"
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              error={errors.password}
            />
            <Button type="submit" className="mt-2 w-full">
              {loading ?  "Signing in"  : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-sm text-slate-500 m-6">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-slate-900 font-medium hover:underline"
            >
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
