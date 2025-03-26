"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type NewUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUser>();

  const mutation = useMutation({
    mutationFn: (newUser: NewUser) =>
      axios.post("/api/auth/register/", {
        email: newUser.email,
        password: newUser.password,
        first_name: newUser.firstName,
        last_name: newUser.lastName,
      }),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const onSubmit = (data: NewUser) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

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

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {mutation.isPending ? "Creating account..." : "Register"}
        </button>

        {mutation.isError && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Registration failed"}
          </p>
        )}
      </form>
    </div>
  );
}
