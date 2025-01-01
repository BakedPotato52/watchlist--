import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    cookies().set('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
    })

    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL))
}

