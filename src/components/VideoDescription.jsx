'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function VideoDescription() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mt-2 px-2">
      <h1 className="text-base font-medium leading-tight">
        Coding | By Kanak Acharya
      </h1>
      <div className="mt-2 text-sm text-muted-foreground">
        629M views • 3 days ago
      </div>

      <div className="flex items-center justify-between mt-4 pb-2 border-b">
        <div className="flex gap-4">
          <div className="flex flex-col  items-center">
            <Button variant="ghost" size="sm" className="h-auto px-4 py-2">
              <ThumbsUp className="h-6 w-6" />
            </Button>
            <span className="text-xs">29K</span>
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
          Come on, make some noise! This stand-up comedy special brings you the hilarious take on coding life, debugging adventures, and everything that makes a developer's world unique. Watch as we explore the funny side of programming!
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

