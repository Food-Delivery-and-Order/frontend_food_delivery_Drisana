import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  icon: Icon,
  autoComplete,
  password = false,
}) {
  const [visible, setVisible] = useState(false);

  const inputType = password
    ? visible
      ? "text"
      : "password"
    : type;

  return (
    <div className="mb-5">

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-200"
      >
        {label}
      </label>

      <div className="relative flex items-center">

        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 text-gray-400"
            aria-hidden="true"
          />
        )}

        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register}
          className={`h-12 w-full rounded-xl border bg-[#111217] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#f5cf3d] focus:ring-2 focus:ring-[#f5cf3d]/10 ${
            error
              ? "border-red-400"
              : "border-white/15"
          }`}
        />

        {password && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-3 grid h-9 w-9 place-items-center rounded-lg text-gray-400 hover:bg-white/5 hover:text-[#f5cf3d]"
          >
            {visible ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}

      </div>

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 text-xs text-red-400"
        >
          {error}
        </p>
      )}

    </div>
  );
}
