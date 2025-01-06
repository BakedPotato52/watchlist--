import { prisma } from "./prisma"
import { NextResponse } from 'next/server'

export async function getUserData(userId) {
    console.log(prisma)

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true,
                videos: {
                    select: {
                        id: true,
                        url: true,
                        title: true,
                        description: true,
                        likes: true,
                        views: true,
                        updatedAt: true
                    }
                }

            }
        })

        if (!user) {
            throw new Error('User not found')
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Failed to fetch user data:', error)
        throw error
    }
}

