import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { setCanPostHeader, setRoleHeader } from "@/lib/user";

import { Role } from "./app/admin/(private)/users/role";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|images|manifest.webmanifest).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/admin/login") &&
    !request.nextUrl.pathname.startsWith("/signup") &&
    !request.nextUrl.pathname.startsWith("/password")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const role = user?.user_metadata.role;
  const canPost = user?.user_metadata.canPost;

  if (
    request.nextUrl.pathname === "/posts/new" &&
    role !== Role.Admin.value &&
    canPost !== true
  ) {
    return NextResponse.rewrite(
      new URL("/no-authorization", process.env.VERCEL_BRANCH_URL),
    );
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    role !== Role.Admin.value
  ) {
    return NextResponse.rewrite(
      new URL("/no-authorization", process.env.VERCEL_BRANCH_URL),
    );
  }

  if (user?.user_metadata.canPost) {
    setCanPostHeader(supabaseResponse);
  }
  setRoleHeader(supabaseResponse, user?.user_metadata.role);
  return supabaseResponse;
}
