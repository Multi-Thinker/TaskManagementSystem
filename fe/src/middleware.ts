import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let status = 404;
  if (token) {
    const { status: responseStatus } = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // 1 hour revalidation
      }
    );
    status = responseStatus;
  }
  const isLoggedIn = token !== "" && status === 200;

  if (!isLoggedIn) {
    return NextResponse.rewrite(new URL("/login", request.url));
  } else {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/", "/login"],
};
