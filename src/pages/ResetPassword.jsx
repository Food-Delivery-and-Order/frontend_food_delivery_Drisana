import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "../schemas/authSchema";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";

export default function ResetPassword() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    setMessage("");
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      if (!baseUrl) {
        setMessage(
          "Validation successful! Connect the backend to request a password reset."
        );
        return;
      }

      const response = await fetch(
        `${baseUrl.replace(/\/$/, "")}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: values.email.trim(),
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to process your request."
        );
      }

      setMessage(
        "If an account matches that email, password-reset instructions will be sent."
      );
    } catch {
      setMessage("We couldn't process your request right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your registered email to receive reset instructions."
    >

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

        <button
          type="submit"
          disabled={loading}
          className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#f0c72f] to-[#ffeb78] font-bold text-[#171717] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send reset instructions"}
        </button>

        {message && (
          <p role="status" className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-5 text-amber-200">
            {message}
          </p>
        )}

      </form>

      <Link
        to="/login"
        className="mt-7 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#f5cf3d]"
      >
        <ArrowLeft size={16} />
        Back to login
      </Link>

    </AuthLayout>
  );
}
