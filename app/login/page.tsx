"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        alert("Login successful");
        router.push("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-50
        via-white
        to-cyan-100
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          w-full
          max-w-md
          p-8
          rounded-2xl
          shadow-xl
        "
      >
        <div className="text-center mb-8">
          <div
            className="
              mx-auto
              h-14
              w-14
              rounded-xl
              bg-gradient-to-br
              from-teal-500
              to-cyan-500
              flex
              items-center
              justify-center
              text-white
              text-2xl
              font-bold
            "
          >
            PM
          </div>

          <h1
            className="
              text-3xl
              font-bold
              mt-4
              text-slate-900
            "
          >
            Welcome Back
          </h1>

          <p className="text-slate-500 mt-2">
            Login to your account
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            focus:ring-2
            focus:ring-cyan-400
            outline-none
          "
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            border
            rounded-lg
            p-3
            mb-6
            focus:ring-2
            focus:ring-cyan-400
            outline-none
          "
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-gradient-to-r
            from-teal-500
            to-cyan-500
            text-white
            py-3
            rounded-lg
            font-semibold
            hover:scale-105
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          className="
            text-center
            mt-6
            text-slate-600
          "
        >
          Don't have an account?

          <button
            type="button"
            onClick={() => router.push("/register")}
            className="
              text-teal-600
              font-semibold
              ml-2
            "
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}