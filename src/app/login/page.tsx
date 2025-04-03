"use client";

import { loginUser } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface Login {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const router = useRouter();
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const form = e.currentTarget as HTMLFormElement;
  //     const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  //     const password = (form.elements.namedItem("password") as HTMLInputElement)
  //       .value;
  //     await loginUser(email, password);
  //     router.push("/dashboard");
  //   };
  const mutation = useMutation({
    mutationFn: (data: Login) => {
      return loginUser(data.email, data.password);
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
  const onSubmit = (data: Login) => {
    mutation.mutate(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
        <a href="/register">Need an account? Register</a>
        {mutation.isError && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Login failed"}
          </p>
        )}
      </form>
    </div>
  );
}
