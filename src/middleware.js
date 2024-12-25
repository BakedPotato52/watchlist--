import { NextResponse } from 'next/server'
import { auth } from './auth'

export async function middleware(request) {
    try {
        const session = await auth(request)
        console.log('Session:', session)

        // If the user is not signed in and the current path is not /auth,
        // redirect to /auth.
        if (!session && !request.nextUrl.pathname.startsWith('/auth')) {
            return NextResponse.redirect(new URL('/auth', request.url))
        }

        return NextResponse.next()
    } catch (error) {
        console.error('Middleware error:', error)
        // In case of an error, allow the request to continue
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

