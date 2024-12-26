import { NextResponse } from 'next/server'

export async function middleware(request) {
    const session = await request.cookies.get('session')?.value
    const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')

    if (isProtectedRoute && !session) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('from', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    if (isAuthPage && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

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
