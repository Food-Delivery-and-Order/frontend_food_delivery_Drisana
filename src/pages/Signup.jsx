import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Mail, Lock } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "../schemas/authSchema";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";
import SocialLogin from "../components/auth/SocialLogin";

export default function Signup() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(values) {
    setMessage("");
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      if (!baseUrl) {
        setMessage(
          "Validation successful! Connect the backend to create your account."
        );
        return;
      }

      const response = await fetch(
        `${baseUrl.replace(/\/$/, "")}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            password: values.password,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to create account."
        );
      }

      setMessage(
        data.message || "Signup successful. Follow the next verification step."
      );
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up and discover your next favourite meal."
    >

      <div className="mb-7 grid grid-cols-2 rounded-xl border border-white/10 bg-[#101116] p-1">

        <Link
          to="/login"
          className="rounded-lg py-3 text-center text-sm font-semibold text-gray-400 transition hover:text-white"
        >
          Log in
        </Link>

        <span className="rounded-lg bg-gradient-to-r from-[#f0c72f] to-[#ffeb78] py-3 text-center text-sm font-bold text-[#171717]">
          Sign up
        </span>

      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <FormField
          label="Full name"
          name="name"
          placeholder="Enter your full name"
          autoComplete="name"
          register={register("name")}
          error={errors.name?.message}
          icon={UserRound}
        />

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
          placeholder="Create a strong password"
          autoComplete="new-password"
          register={register("password")}
          error={errors.password?.message}
          icon={Lock}
          password
        />

        <p className="-mt-2 mb-5 text-xs leading-5 text-gray-500">
          Use at least 8 characters, including uppercase, lowercase, a number and a symbol.
        </p>

        <FormField
          label="Confirm password"
          name="confirmPassword"
          placeholder="Enter your password again"
          autoComplete="new-password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          icon={Lock}
          password
        />

        <div className="mb-3 flex items-start gap-3">

          <input
            id="terms"
            type="checkbox"
            {...register("terms")}
            className="mt-1 h-4 w-4 accent-[#f5cf3d]"
          />

          <label htmlFor="terms" className="text-xs leading-5 text-gray-400">
            I agree to the Terms &amp; Conditions and Privacy Policy.
          </label>

        </div>

        {errors.terms && (
          <p role="alert" className="mb-3 text-xs text-red-400">
            {errors.terms.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#f0c72f] to-[#ffeb78] font-bold text-[#171717] shadow-lg shadow-yellow-500/10 transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {message && (
          <p role="status" className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-5 text-amber-200">
            {message}
          </p>
        )}

      </form>

      <SocialLogin />

      <p className="mt-7 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-[#f5cf3d] hover:underline">
          Log in
        </Link>
      </p>


    </AuthLayout>
  );
}