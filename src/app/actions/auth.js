'use server'

import { signIn } from "next-auth/react"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function handleSignIn(providerId, credentials) {
    try {
        if (providerId === "credentials" && credentials) {
            return await signIn(providerId, {
                redirect: false,
                username: credentials.username,
                password: credentials.password
            })
        } else {
            return await signIn(providerId, { redirect: false })
        }
    } catch (error) {
        console.error('Sign in error:', error)
        return { error: 'An unexpected error occurred' }
    }
}

export async function handleSignUp(username, email, password) {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username },
                ]
            }
        })

        if (existingUser) {
            return { error: 'Username or email already exists' }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        })

        return { success: true, user: { id: newUser.id, username: newUser.username, email: newUser.email } }
    } catch (error) {
        console.error('Sign up error:', error)
        return { error: 'An unexpected error occurred during sign up' }
    }
}

