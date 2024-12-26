import { NextResponse } from 'next/server'

export function middleware(request) {
    const session = request.cookies.get('session')?.value
    const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')

    // If trying to access protected route without session, redirect to login
    if (isProtectedRoute && !session) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('from', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    // If trying to access auth pages with session, redirect to app
    if (isAuthPage && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Allow all other routes
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
