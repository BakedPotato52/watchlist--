import { NextResponse } from 'next/server'
import { getRecommendedVideos } from '@/app/api/recommended-videos'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const currentVideoId = searchParams.get('currentVideoId')

    if (!currentVideoId) {
        return NextResponse.json({ error: 'Current video ID is required' }, { status: 400 })
    }

    try {
        const videos = await getRecommendedVideos(currentVideoId)
        return NextResponse.json(videos)
    } catch (error) {
        console.error('Error fetching recommended videos:', error)
        return NextResponse.json({ error: 'Failed to fetch recommended videos' }, { status: 500 })
    }
}

