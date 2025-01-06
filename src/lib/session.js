'use server'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
    throw new Error('SESSION_SECRET is not set')
}

const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h') // Set session to expire in 1 hour
        .sign(key)
}

export async function decrypt(token) {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.error('Failed to decrypt session:', error)
        return null
    }
}

export async function getSession() {
    const sessionCookies = await cookies()
    const session = sessionCookies.get('session')?.value
    if (!session) return null
    return await decrypt(session)
}

export async function setSession(data) {
    const session = await encrypt(data)
    cookies().set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/',
    })
}

