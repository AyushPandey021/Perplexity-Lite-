import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth.api";
import AuthShell from "../components/AuthShell";
import FormField from "../components/FormField";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);
    try {
      const data = await registerUser(form);
      setMessage(data.message);
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Experience the future of intelligent search today."
      footerText="Already have an account?"
      footerLinkText="Sign In"
      footerHref="/login"
      showGoogle
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name → maps to "username" field */}
        <FormField
          id="username"
          label="Full Name"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          placeholder="Alex Rivera"
          autoComplete="name"
          minLength={3}
          required
        />

        {/* Email */}
        <FormField
          id="email"
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="alex@example.com"
          autoComplete="email"
          required
        />

        {/* Password */}
        <FormField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete="new-password"
          minLength={6}
          required
          hint="Must be at least 6 characters long."
        />

        {/* Error banner */}
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* Success banner */}
        {message && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {message}{" "}
            <Link
              to="/login"
              className="font-semibold underline underline-offset-2 hover:text-emerald-900 transition-colors"
            >
              Go to login
            </Link>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-12 w-full rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account…" : "Create Account"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Register;