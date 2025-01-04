'use server'

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function handleSignIn(username, password) {
    try {
        const finduser = await prisma.user.findFirst({
            where: {
                username: username,
            },
        })
        if (!finduser) {
            return { error: 'User not found' }
        }
        const passwordMatch = await bcrypt.compare(password, finduser.password)
        if (!passwordMatch) {
            return { error: 'Invalid password' }
        }
        return {
            success: true, user: {
                id: finduser.id, username: finduser.username, email: finduser.email
            }
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

