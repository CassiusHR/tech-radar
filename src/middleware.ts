import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isIndexable } from "@/lib/site";

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();

  // Defense-in-depth: keep bots out even if they ignore robots.txt / meta.
  if (!isIndexable()) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return res;
}

export const config = {
  matcher: ["/:path*"],
};
