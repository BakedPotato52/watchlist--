import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })

    if (!token && !request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

