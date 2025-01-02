import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith("/signin") && req.nextauth.token) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: [
        // Match all protected routes
        '/:path*',
        "/dashboard/:path*",
        "/profile/:path*",
        "/settings/:path*",
        // Add other protected routes here

        // Exclude auth routes and public routes
        "/((?!api|_next/static|_next/image|favicon.ico|public|auth).*)",
    ],
}
