import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ["/experimental"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const session = (await cookies()).get("session")?.value;

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}