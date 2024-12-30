'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

// Import ReactPlayer dynamically to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-muted flex items-center justify-center">
      <p>Loading player...</p>
    </div>
  ),
})


export default function VideoPlayer({ videoUrl }) {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className="relative w-full aspect-video bg-muted">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls
        playing={false}
        onReady={() => setIsReady(true)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  )
}

