'use client'
import Image from "next/image"
import Link from "next/link"
import { formatTimeAgo } from "@/lib/util"

export function VideoCard({ video, layout = "grid" }) {
    const videoDetails = video;
    const videoDuration = videoDetails.duration / 60;
    return (
        <Link href={`/video/${video.id}`}>
            <div className={`group ${layout === "grid" ? "w-full" : "flex gap-4"}`}>
                <div className={`relative ${layout === "grid" ? "aspect-video w-full" : "aspect-video w-[180px]"}`}>
                    <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-xs text-white">
                        {videoDuration} Mins
                    </div>
                </div>
                <div className={`mt-2 ${layout === "list" ? "flex-1" : ""}`}>
                    <div className="flex gap-2">
                        {video.channelImage && (
                            <Image
                                src={video.channelImage}
                                alt={video.channelName}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
                            <p className="text-sm text-muted-foreground">{video.channelName}</p>
                            <p className="text-sm text-muted-foreground">
                                {videoDetails.views ? videoDetails.views.length.toLocaleString() : '0'} Views • {formatTimeAgo(video.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

