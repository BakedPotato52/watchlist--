'use client'
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { formatTimeAgo } from "@/lib/util"

export function VideoCard({ video, layout = "grid" }) {
    const videoDetails = video;
    const videoDuration = (videoDetails.duration / 60).toFixed(1); // Show 1 decimal for duration

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden  shadow-lg transition-transform"
        >
            <Link href={`/video/${video.id}`} className="block">
                <div className={`group ${layout === "grid" ? "w-full" : "flex gap-4"}`}>
                    <motion.div
                        className={`relative ${layout === "grid" ? "aspect-video w-full" : "aspect-video w-[180px]"}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 px-1 text-xs text-white">
                            {videoDuration} Mins
                        </div>
                    </motion.div>
                    <div className={`mt-2 ${layout === "list" ? "flex-1" : ""}`}>
                        <div className="flex gap-2">
                            {video.channelImage && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <Image
                                        src={video.channelImage}
                                        alt={video.channelName}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                </motion.div>
                            )}
                            <div className="flex-1 pl-2">
                                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{video.channelName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {videoDetails.views ? videoDetails.views.length.toLocaleString() : '0'} Views • {formatTimeAgo(video.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
