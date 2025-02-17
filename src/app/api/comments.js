import { prisma } from '@/lib/prisma'

export async function getComments(videoId) {
    const comments = await prisma.comment.findMany({
        where: {
            videoId: videoId
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    })

    return comments
}
