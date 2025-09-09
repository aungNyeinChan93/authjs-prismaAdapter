"use client";

import { registerAction } from "@/features/auth/auth-action";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, undefined);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold text-center">Register Form</h1>

        {/* Email + Password */}
        {!state?.success && state?.error?.other && (
          <>
            <p className="text-base text-red-600">{state?.error?.other}</p>
          </>
        )}
        <form className="space-y-4" action={formAction}>
          {!state?.success && (
            <p className="text-red-600 text-sm p-1">{state?.error?.email}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border p-2"
            name="email"
          />
          {!state?.success && (
            <p className="text-red-600 text-sm p-1">{state?.error?.password}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border p-2"
            name="password"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Social logins */}
        <button
          type="button"
          //   onClick={() => signIn("github", { callbackUrl: "/" })}
          className="mb-2 w-full rounded-lg bg-gray-800 p-2 text-white hover:bg-gray-900"
        >
          Continue with GitHub
        </button>
        <button
          type="button"
          //   onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
