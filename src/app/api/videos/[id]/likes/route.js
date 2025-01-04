import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
    request,
    { params }
) {
    try {
        const { action } = await request.json()
        const userId = 'user-id' // TODO: Get this from the authenticated user session

        if (action !== 'like' && action !== 'unlike') {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
        }

        const video = await prisma.video.findUnique({
            where: { id: params.id },
            include: { likes: true },
        })

        if (!video) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 })
        }

        let updatedVideo

        if (action === 'like') {
            updatedVideo = await prisma.video.update({
                where: { id: params.id },
                data: {
                    likes: {
                        connect: { id: userId },
                    },
                },
                include: { likes: true },
            })
        } else {
            updatedVideo = await prisma.video.update({
                where: { id: params.id },
                data: {
                    likes: {
                        disconnect: { id: userId },
                    },
                },
                include: { likes: true },
            })
        }

        return NextResponse.json({ likes: updatedVideo.likes.length })
    } catch (error) {
        console.error('Error updating likes:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

