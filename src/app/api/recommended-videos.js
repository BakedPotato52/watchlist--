import { prisma } from '@/lib/prisma'

export async function getRecommendedVideos(currentVideoId) {
    const videos = await prisma.video.findMany({
        where: {
            id: {
                not: currentVideoId
            },
            visibility: 'PUBLIC' // Only fetch public videos
        },
        select: {
            id: true,
            url: true,
            title: true,
            description: true,
            thumbnailUrl: true, // Corrected field name
            duration: true,
            createdAt: true,
            updatedAt: true,
            views: {
                select: {
                    id: true
                }
            },
            user: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true
                }
            },

        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10 // Limit to 10 recommended videos
    })

    return videos
}

