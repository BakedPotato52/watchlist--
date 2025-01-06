import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { VideoCard } from "@/components/video-card"
import { Sidebar } from "@/components/sidebar"
import { getSession } from "@/lib/session"

async function getVideos() {
    return await prisma.video.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            views: true
        }
    })
}

export default async function HomePage() {
    const session = await getSession()
    if (!session) {
        return {
            status: 401,
            headers: {
                'Location': '/signin'
            }
        }
    }

    const videos = await getVideos()
    return <HomePageClient session={session} videos={videos} />
}

function HomePageClient({ session, videos }) {
    console.log("session is", session);

    return (
        <div className="flex h-screen bg-background">
            <Sidebar className="w-64 flex-shrink-0" />
            <main className="flex-grow p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <Suspense fallback={<VideoCardSkeleton count={12} />}>
                        {videos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </Suspense>
                </div>
            </main>
        </div>
    )
}

function VideoCardSkeleton({ count = 1 }) {
    return (
        <>
            {Array(count).fill(0).map((_, i) => (
                <div key={i} className="space-y-3">
                    <div className="aspect-video bg-muted rounded-lg animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </>
    )
}

