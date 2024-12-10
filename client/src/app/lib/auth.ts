import "server-only";

import { cookies } from "next/headers";

export async function createSession(accessToken: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies()
  cookieStore.set("session", accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}