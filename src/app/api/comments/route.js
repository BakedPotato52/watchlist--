import { NextResponse } from 'next/server'
import { getComments } from '@/app/api/comments'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')

    if (!videoId) {
        return NextResponse.json({ error: 'Video ID is required' }, { status: 400 })
    }

    try {
        const comments = await getComments(videoId)
        return NextResponse.json(comments)
    } catch (error) {
        console.error('Error fetching comments:', error)
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
    }
}

export async function POST(request) {
    const body = await request.json()
    const { videoId, content } = body

    if (!videoId || !content) {
        return NextResponse.json({ error: 'Video ID and content are required' }, { status: 400 })
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                videoId,
                userId: 'placeholder-user-id', // Replace with actual user ID from authentication
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        })

        return NextResponse.json(comment)
    } catch (error) {
        console.error('Error creating comment:', error)
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
    }
}

