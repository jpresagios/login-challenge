"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../lib/auth";
import { schema } from "./schema";
import { fetchWithTimeout } from "../lib/fetchEnhance";

export async function handleLoginForm(formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const payload = {
    email,
    password,
  };

  try {
    const response = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }, 5000);

    if (response.ok) {
      const data = await response.json();

      await createSession(data.accessToken)
      return { data, success: true}
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid login. Please check your email and password and try again.");
    }
  } catch (error) {
    throw error;
  }
}

export async function removeSession() {
  await deleteSession()
  redirect('/')
}