'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from './prisma'
import bcrypt from 'bcryptjs'

export async function signUp(formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const username = formData.get('username')

    try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: 'User already exists' }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username
            }
        })

        // Set session cookie
        const session = { user: { id: user.id, email: user.email, username: user.username } }
        cookies().set('session', JSON.stringify(session), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/', // Important: Set cookie path to root
        })
        redirect('/dashboard')
    } catch (error) {
        return { error: 'An error occurred during sign up' }
    }
}

export async function signIn(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return { error: 'Invalid credentials' }
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return { error: 'Invalid credentials' }
        }

        // Set session cookie
        const session = { user: { id: user.id, email: user.email, username: user.username } }
        cookies().set('session', JSON.stringify(session), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/', // Important: Set cookie path to root
        })

        redirect('/dashboard')
    } catch (error) {
        return { error: 'An error occurred during sign in' }
    }
}


export async function signOut() {
    // Clear the session cookie properly
    cookies().set('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/', // Important: Set cookie path to root
    })
    redirect('/login')
}

export async function getSession() {
    try {
        const cookieStore = cookies()
        const sessionCookie = await cookieStore.get('session')
        if (!sessionCookie) return { user: null }
        return JSON.parse(sessionCookie.value)
    } catch (error) {
        console.error('Error parsing session:', error)
        return { user: null }
    }
}