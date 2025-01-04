'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatTimeAgo } from '@/lib/util'
import { fetchVideoDetails, updateLikes, updateSubscription } from '@/app/api/video-details'


export default function VideoDescription({ video }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [videoDetails, setVideoDetails] = useState(null)
  const [likes, setLikes] = useState(0)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setVideoDetails(video)
      setLikes(video.likes.length)
    }

    fetchVideoDetails()
  }, [video])
  console.log(videoDetails);

  const handleLike = async () => {
    if (!videoDetails) return

    try {
      const action = hasLiked ? 'unlike' : 'like'
      const { likes: updatedLikes } = await updateLikes(video, action)
      setLikes(updatedLikes)
      setHasLiked(!hasLiked)
    } catch (error) {
      console.error('Failed to update likes:', error)
    }
  }

  const handleShare = () => {
    if (!videoDetails) return

    if (navigator.share) {
      navigator.share({
        title: videoDetails.title,
        text: 'Check out this video!',
        url: window.location.href,
      }).catch((error) => console.error('Error sharing:', error))
    } else {
      alert('Share not supported on this browser')
    }
  }

  const handleSubscribe = async () => {
    if (!videoDetails) return

    try {
      const action = isSubscribed ? 'unsubscribe' : 'subscribe'
      const { isSubscribed: updatedSubscription } = await updateSubscription(videoDetails.user.id, action)
      setIsSubscribed(updatedSubscription)
    } catch (error) {
      console.error('Failed to update subscription:', error)
    }
  }

  if (!videoDetails) return <div>Loading...</div>

  return (
    <div className="mt-2 px-2">
      <h1 className="text-base font-medium leading-tight">{videoDetails.title}</h1>
      <div className="mt-2 text-sm text-muted-foreground">
        {videoDetails.views.length.toLocaleString()} views • {formatTimeAgo(videoDetails.updatedAt)}
      </div>

      <div className="flex items-center justify-between mt-4 pb-2 border-b">
        <div className="flex gap-4">
          {[
            { icon: ThumbsUp, label: `${likes.toLocaleString()} likes`, onClick: handleLike },
            { icon: ThumbsDown, label: 'Dislike' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center"
              onClick={item.onClick}
            >
              <Button variant="ghost" size="sm" className="h-auto px-4 py-2">
                <item.icon className="h-6 w-6" />
              </Button>
              <span className="text-xs">{item.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex gap-4">
          {[
            { icon: Share2, label: 'Share', onClick: handleShare },
            { icon: Bookmark, label: 'Save' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center"
              onClick={item.onClick}
            >
              <Button variant="ghost" size="sm" className="h-auto px-4 py-2">
                <item.icon className="h-6 w-6" />
              </Button>
              <span className="text-xs">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-between py-2 mt-2">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={videoDetails.user.avatarUrl || "/placeholder.svg?height=40&width=40"}
              alt={`${videoDetails.user.username}'s avatar`}
            />
            <AvatarFallback>{videoDetails.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{videoDetails.user.username}</p>
            <p className="text-sm text-muted-foreground">{videoDetails.user.subscribers.length.toLocaleString()} subscribers</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="default"
            className="bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={handleSubscribe}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </motion.div>
      </div>

      <div className="mt-2 relative">
        <motion.div
          initial={{ height: isExpanded ? "auto" : "2.5rem" }}
          animate={{ height: isExpanded ? "auto" : "2.5rem" }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-sm">{videoDetails.description}</p>
        </motion.div>
        {!isExpanded && (
          <Button
            variant="ghost"
            size="sm"
            className="text-sm p-0 h-auto font-medium mt-1"
            onClick={() => setIsExpanded(true)}
          >
            ...more
          </Button>
        )}
      </div>
    </div>
  )
}

