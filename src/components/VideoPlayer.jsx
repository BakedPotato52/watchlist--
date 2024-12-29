"use client"
import dynamic from 'next/dynamic'
import { useState } from 'react'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })


export default function VideoPlayer({ videoUrl }) {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
      {!isReady && (
        <div className="flex items-center justify-center h-full">
          <p>Loading player...</p>
        </div>
      )}
      <ReactPlayer
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        className={`w-full h-full object-cover aspect-video ${isReady ? 'block' : 'hidden'}`}
        onReady={() => setIsReady(true)}
      />
    </div>
  )
}

