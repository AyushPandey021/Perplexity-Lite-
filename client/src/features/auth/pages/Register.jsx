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
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Register"
      subtitle="Create an account with your username, email, and password."
      footerText="Already have an account?"
      footerLinkText="Login"
      footerHref="/login"
    >
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <FormField
          id="username"
          label="Username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          placeholder="Choose a username"
          autoComplete="username"
          minLength={3}
          required
        />
        <FormField
          id="email"
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <FormField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
          autoComplete="new-password"
          minLength={6}
          required
        />

        {error ? (
          <div className="rounded-[8px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-[8px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {message}{" "}
            <Link
              className="font-semibold underline-offset-4 hover:underline"
              to="/login"
            >
              Go to login
            </Link>
          </div>
        ) : null}

        <button
          className="h-12 w-full rounded-[8px] bg-cyan-500 px-4 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-cyan-300"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Register;
