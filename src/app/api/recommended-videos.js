import { prisma } from '@/lib/prisma'

export async function getRecommendedVideos(currentVideoId) {
    const videos = await prisma.video.findMany({
        where: {
            id: {
                not: currentVideoId
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10 // Limit to 10 recommended videos
    })

    return videos
}

