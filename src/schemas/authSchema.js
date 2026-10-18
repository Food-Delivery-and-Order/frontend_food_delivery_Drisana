import { z } from "zod";

const emailValidation = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .max(254, "Email is too long");

const passwordValidation = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .max(128, "Password must not exceed 128 characters")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[0-9]/, "Include at least one number")
  .regex(/[^A-Za-z0-9]/, "Include at least one special character");

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(60, "Name cannot exceed 60 characters")
    .regex(
      /^[\p{L}\p{M}]+(?:[ .'-][\p{L}\p{M}]+)*$/u,
      "Enter a valid name"
    ),

  email: emailValidation,

  password: passwordValidation,

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),

  terms: z.boolean().refine(
    (value) => value === true,
    "Please accept the terms and conditions"
  ),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  }
);

export const loginSchema = z.object({
  email: emailValidation,

  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password is too long"),
});

export const resetPasswordSchema = z.object({
  email: emailValidation,
});
