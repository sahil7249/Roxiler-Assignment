import { useState } from "react";
import { Alert, Button, Input, Select } from "../components/Ui";
import {
  validateAddress,
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validator";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";

export const RegisterUserPage = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    confirmPassword: "",
    role: "USER",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const addressError = validateAddress(form.address);

    let confirmPasswordError = "";

    if (!form.confirmPassword.trim()) {
      confirmPasswordError = "Confirm password is required";
    } else if (form.confirmPassword != form.password) {
      confirmPasswordError = "Passwords do not match";
    }

    setErrors({
      name: nameError ?? "",
      email: emailError ?? "",
      password: passwordError ?? "",
      address: addressError ?? "",
      confirmPassword: confirmPasswordError ?? "",
    });

    if (
      nameError ||
      emailError ||
      addressError ||
      passwordError ||
      confirmPasswordError
    ) {
      return;
    }

    try {
      await api.auth.register({
        name: form.name,
        email: form.email,
        address: form.address,
        password: form.password,
        role: form.role,
      });
      await login(form.email, form.password);
    } catch (error) {
      setApiError(error.message || "Registration failed please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            RateStore
          </h1>
          <p className="text-slate-500 text-sm mt-1">Create your account</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            {apiError && <Alert message={apiError} />}
            <Input
              id="name"
              label="Full Name"
              placeholder="Min 20 characters"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              error={errors.name}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              autoComplete="email"
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              error={errors.email}
            />
            <Input
              id="address"
              label="Address"
              placeholder="Your full address"
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({ ...p, address: e.target.value }))
              }
              error={errors.address}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="8-16 chars, 1 uppercase, 1 special"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              error={errors.password}
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Repeat password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm((p) => ({ ...p, confirmPassword: e.target.value }))
              }
              error={errors.confirmPassword}
            />
            <Select
              id={"role"}
              label="Role"
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              options={[
                { value: "USER", label: "Normal User" },
                { value: "STORE_OWNER", label: "Store Owner" },
                { value: "ADMIN", label: "Admin" },
              ]}
            />
            <Button type="submit" disabled={loading} className="mt-2 w-full">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have and account?{" "}
          <Link
            to={"/login"}
            className="text-slate-900 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
