import { prisma } from "./prisma"

export async function getUserData(userId) {
    try {
        const user = await prisma.User.findUnique({
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

        return user
    } catch (error) {
        console.error('Failed to fetch user data:', error)
        throw error
    }
}

