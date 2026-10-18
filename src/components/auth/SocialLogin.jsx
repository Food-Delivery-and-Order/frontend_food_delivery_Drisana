import { useState } from "react";


export default function SocialLogin() {
  const [message, setMessage] = useState("");
  

  function handleSocialLogin(provider) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!baseUrl) {
      setMessage(
        `${provider === "google" ? "Google" : "Facebook"} login will be available after backend integration.`
      );
      return;
    }

    const paths = {
      google: "/api/auth/google",
      facebook: "/api/auth/facebook",
    };

    window.location.assign(
      `${baseUrl.replace(/\/$/, "")}${paths[provider]}`
    );
  }

  return (
    <div className="mt-7">
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="h-px flex-1 bg-white/10"></span>
        or continue with
        <span className="h-px flex-1 bg-white/10"></span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold transition hover:bg-white/10"
        >
          <span className="text-lg font-extrabold text-blue-400">G</span>
          Google
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("facebook")}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold transition hover:bg-white/10"
        >
          <span className="text-lg font-extrabold text-blue-500">f</span>
          Facebook
        </button>
      </div>

      {message && (
        <p role="status" className="mt-3 text-xs text-amber-300">
          {message}
        </p>
      )}
    </div>
  );
}
