"use client";

import { useForm } from "react-hook-form";
import { handleLoginForm } from "./actions";
import { Button, Checkbox, TextField } from "../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, FormSchemaData } from "./schema";
import { useUser } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaData>({ resolver: zodResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { user, setUser, rememberMe, setRememberMe } = useUser();

  const onSubmit = async (data: FormSchemaData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const result = await handleLoginForm(formData);
      if (result.success) {
        setUser(result.data.user);
        router.push("/dashboard");
      } else {
        Swal.fire("Error", "Oops something went wrong :(", "error");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire("Error", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-3xl max-w-[500px] p-6 rounded shadow-md bg-white flex flex-col gap-y-5 items-center"
        noValidate
      >
        <h1 className="text-3xl mt-9 mb-9 uppercase font-bold">
          Sign in to your account
        </h1>

        <div className="w-[81%]">
          <TextField.Root
            className={`${errors.email ? "border-red-500" : "border-gray-300"}`}
          >
            <TextField.Input
              id="email"
              placeholder="Username"
              type="email"
              defaultValue={rememberMe ? user?.email : ""}
              {...register("email")}
            />
          </TextField.Root>
          {errors.email && (
            <p className="text-red-500 text-xs ml-2 mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="w-[81%]">
          <TextField.Root
            className={`${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          >
            <TextField.Input
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />

            <TextField.Slot>
              {showPassword && (
                <EyeIcon
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="cursor-pointer h-[16px] w-[16px]"
                />
              )}
              {!showPassword && (
                <EyeSlashIcon
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="cursor-pointer h-[16px] w-[16px]"
                />
              )}
            </TextField.Slot>
          </TextField.Root>

          <div className="flex items-center mt-4">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
              }}
              id="rememberMe"
            />
            <label
              htmlFor="rememberMe"
              className="ms-2 text-sm font-medium text-base text-graylight font-normal"
            >
              Remember me
            </label>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs ml-2 mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`mb-9  mt-9 text-xs ${
            isSubmitting
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "hover:bg-indigo-700 text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Login Now"}
        </Button>
      </form>
    </main>
  );
}
