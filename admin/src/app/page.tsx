'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

// Label Component
const Label = ({
  htmlFor,
  children,
  className,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className={twMerge(
      "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300",
      className
    )}
  >
    {children}
  </label>
);

// Input Component
const Input = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
}: {
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  const baseClass = "w-full px-4 py-2 rounded-lg border text-sm shadow-sm placeholder:text-gray-400";
  const lightClass = "bg-white text-gray-900 border-gray-300 focus:ring-brand-500 focus:border-brand-500";
  const darkClass = "dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:border-brand-400";

  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={twMerge(baseClass, lightClass, darkClass, className)}
    />
  );
};

// Sign In Page
export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded admin credentials
  const admin = {
    email: "admin@example.com",
    password: "admin123",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === admin.email && password === admin.password) {
      document.cookie = "logged_in=true; path=/";
      router.push("/dashboard");
    } else {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Sign In</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Login to your account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
