import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useSession } from "next-auth/react";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const { data: session } = useSession();

  let cookie = request.cookies.get("next-auth.session-token");
  // console.log(cookie);

  if (request.nextUrl.pathname.startsWith("/Admin") && !cookie) {
    console.log("sadsasad");
    // console.log(session?.user);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/Admin/:path*",
};

// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log("--------------", req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//   }
// );

// export const config = { matcher: ["/Admin/:path*"] };

// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";
// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import { useSession } from "next-auth/react";

// export default async function middleware(
//   req: NextRequest,
//   event: NextFetchEvent
// ) {
//   const token = await getToken({ req });
//   const { data: session } = useSession();
//   const isAuthenticated = !!token;
//   console.log(session);
//   if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   const authMiddleware = await withAuth({
//     pages: {
//       signIn: `/login`,
//     },
//   });

//   // @ts-expect-error
//   return authMiddleware(req, event);
// }

// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/Admin/:path*"] };

// import { NextResponse } from "next/server";
// import { useSession } from "next-auth/react";
// import type { NextRequest } from "next/server";

// export default function middleware({ request }: { request: NextRequest }) {
//   const { data: session } = useSession();

//   if (request.nextUrl.pathname.startsWith("/Admin") && !session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//   }
// );

// export const config = { matcher: ["/Admin/:path*"] };
