'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function VideoDescription({ videoId }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [videoDetails, setVideoDetails] = useState(null)

  useEffect(() => {
    // Fetch video details using the videoId
    // This is a placeholder and should be replaced with actual API call
    const fetchVideoDetails = async () => {
      // const response = await fetch(`/api/video/${videoId}`);
      // const data = await response.json();
      // setVideoDetails(data);

      // Placeholder data
      setVideoDetails({
        title: 'Sample Video Title',
        description: 'This is a sample video description. Replace this with actual data from your API.',
        views: 1000000,
        likes: 50000,
        uploadDate: '2023-01-01'
      });
    };

    fetchVideoDetails();
  }, [videoId]);

  if (!videoDetails) return <div>Loading...</div>;

  return (
    <div className="mt-2 px-2">
      <h1 className="text-base font-medium leading-tight">
        {videoDetails.title}
      </h1>
      <div className="mt-2 text-sm text-muted-foreground">
        {videoDetails.views} views • {videoDetails.uploadDate}
      </div>

      <div className="flex items-center justify-between mt-4 pb-2 border-b">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="sm" className="h-auto px-4 py-2">
              <ThumbsUp className="h-6 w-6" />
            </Button>
            <span className="text-xs">{videoDetails.likes.toLocaleString()} likes</span>
          </div>
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="sm" className="h-auto px-4 py-2">
              <ThumbsDown className="h-6 w-6" />
            </Button>
            <span className="text-xs">Dislike</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="sm" className="h-auto px-4 py-2">
              <Share2 className="h-6 w-6" />
            </Button>
            <span className="text-xs">Share</span>
          </div>
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="sm" className="h-auto px-4 py-2">
              <Bookmark className="h-6 w-6" />
            </Button>
            <span className="text-xs">Save</span>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between py-2 mt-2">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Channel Avatar" />
            <AvatarFallback>KA</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">kanak</p>
            <p className="text-sm text-muted-foreground">524M subscribers</p>
          </div>
        </div>
        <Button
          variant="default"
          className="bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Subscribe
        </Button>
      </div>

      <div className="mt-2 relative">
        <p className={`text-sm ${!isExpanded && 'line-clamp-2'}`}>
          {videoDetails.description}
        </p>
        {!isExpanded && (
          <Button
            variant="ghost"
            size="sm"
            className="text-sm p-0 h-auto font-medium"
            onClick={() => setIsExpanded(true)}
          >
            ...more
          </Button>
        )}
      </div>
    </div>
  )
}

