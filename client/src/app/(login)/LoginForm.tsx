"use client";

import { useForm } from "react-hook-form";
import { handleLoginForm, removeSession } from "./actions";
import { Button, Checkbox, TextField } from "../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, FormSchemaData } from "./schema";
import { useUser } from "../context/AuthContext";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { Welcome } from "./Welcome";

export const Form = ({
  onSubmit,
}: {
  onSubmit: (data: FormSchemaData) => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaData>({ resolver: zodResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const {
    successLoginState: { email, rememberMe },
    setSuccessLogin,
  } = useUser();

  return (
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
            aria-label="email"
            placeholder="Username"
            type="email"
            defaultValue={rememberMe && email ? email : undefined}
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
            aria-label="password"
            placeholder="password"
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

        {errors.password && (
          <p className="text-red-500 text-xs ml-2 mt-2">
            {errors.password.message}
          </p>
        )}

        <div className="flex items-center mt-4">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => {
              setSuccessLogin({ rememberMe: e.target.checked });
            }}
          />
          <label
            htmlFor="rememberMe"
            className="ms-2 text-sm font-medium text-base text-graylight font-normal"
          >
            Remember me
          </label>
        </div>
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
  );
};

export default function LoginForm() {
  const {
    setUser,
    user,
    logout,
    loading,
    successLoginState: { rememberMe },
    setSuccessLogin,
  } = useUser();

  const handleLogout = () => {
    removeSession();
    logout();
  };

  const onSubmit = async (data: FormSchemaData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const result = await handleLoginForm(formData);
      if (result.success) {
        setUser(result.data.user);
        if (rememberMe) {
          setSuccessLogin({ email: result.data.user.email });
        }
      }
    } catch (error: unknown) {
      console.log(error)
      Swal.fire(
        "Error",
        "Please double-check your credentials and try again"
      );
    }
  };

  if (loading) return <></>;

  if (user !== null)
    return <Welcome email={user.email} handleLogout={handleLogout} />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Form onSubmit={onSubmit} />
    </main>
  );
}
