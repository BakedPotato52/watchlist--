import { prisma } from "./prisma"

export async function getVideoData(videoId) {
    try {
        const video = await prisma.video.findUnique({
            where: { id: videoId },
            select: { id: true, url: true, title: true, description: true }
        })

        if (!video) {
            throw new Error('Video not found')
        }

        return video
    } catch (error) {
        console.error('Failed to fetch video data:', error)
        throw error
    }
}

