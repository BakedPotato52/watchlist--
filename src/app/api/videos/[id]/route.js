import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
    request,
    { params }
) {
    try {
        const video = await prisma.video.findUnique({
            where: { id: params.id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                        subscribers: true,
                    },
                },
                likes: true,
                views: true,
            },
        })

        if (!video) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 })
        }

        return NextResponse.json(video)
    } catch (error) {
        console.error('Error fetching video:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

