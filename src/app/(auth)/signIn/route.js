import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        // Create session
        const session = { user: { id: user.id, email: user.email, name: user.name } }

        // Set session cookie
        cookies().set('session', JSON.stringify(session), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })

        // Don't send the password back
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(userWithoutPassword, { status: 200 })
    } catch (error) {
        console.error('Signin error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

