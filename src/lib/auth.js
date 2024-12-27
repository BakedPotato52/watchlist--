'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signUp(formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        })

        if (!response.ok) {
            const error = await response.json()
            return { error: error.error || 'An error occurred during sign up' }
        }

        // Automatically sign in after successful sign up
        return signIn(formData)
    } catch (error) {
        return { error: 'An error occurred during sign up' }
    }
}

export async function signIn(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const error = await response.json()
            return { error: error.error || 'An error occurred during sign in' }
        }

        redirect('/dashboard')
    } catch (error) {
        return { error: 'An error occurred during sign in' }
    }
}

export async function signOut() {
    cookies().set('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
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

