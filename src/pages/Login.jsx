import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/authSchema";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";
import SocialLogin from "../components/auth/SocialLogin";

export default function Login() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values) {
    setMessage("");
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      if (!baseUrl) {
        setMessage(
          "Validation successful! Connect the backend to authenticate your account."
        );
        return;
      }

      const response = await fetch(
        `${baseUrl.replace(/\/$/, "")}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: values.email.trim(),
            password: values.password,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Invalid email or password."
        );
      }

      setMessage(
        data.message || "Login successful. Complete the agreed session handling."
      );
    } catch (error) {
      setMessage(error.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to find something delicious."
    >

      <div className="mb-7 grid grid-cols-2 rounded-xl border border-white/10 bg-[#101116] p-1">

        <span className="rounded-lg bg-gradient-to-r from-[#f0c72f] to-[#ffeb78] py-3 text-center text-sm font-bold text-[#171717]">
          Log in
        </span>

        <Link
          to="/signup"
          className="rounded-lg py-3 text-center text-sm font-semibold text-gray-400 transition hover:text-white"
        >
          Sign up
        </Link>

      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <FormField
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          register={register("email")}
          error={errors.email?.message}
          icon={Mail}
        />

        <FormField
          label="Password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          register={register("password")}
          error={errors.password?.message}
          icon={Lock}
          password
        />

        <div className="mb-6 flex items-center justify-between gap-3">

          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-400">
            <input
              type="checkbox"
              {...register("remember")}
              className="h-4 w-4 accent-[#f5cf3d]"
            />
            Remember me
          </label>

          <Link
            to="/reset-password"
            className="text-xs font-semibold text-red-400 hover:underline"
          >
            Forgot password?
          </Link>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#f0c72f] to-[#ffeb78] font-bold text-[#171717] shadow-lg shadow-yellow-500/10 transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {message && (
          <p role="status" className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-5 text-amber-200">
            {message}
          </p>
        )}

      </form>

      <SocialLogin />

      <p className="mt-7 text-center text-sm text-gray-400">
        New to Crave?{" "}
        <Link to="/signup" className="font-bold text-[#f5cf3d] hover:underline">
          Create an account
        </Link>
      </p>

    </AuthLayout>
  );
}
