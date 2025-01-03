'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
  loading: () => (
    <motion.div
      className="w-full aspect-video bg-muted flex items-center justify-center rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p>Loading player...</p>
    </motion.div>
  ),
})

export default function VideoPlayer({ videoUrl }) {
  const [isReady, setIsReady] = useState(false)

  return (
    <motion.div
      className="relative w-full aspect-video bg-muted overflow-hidden rounded-lg shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {!isReady && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">Loading player...</p>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
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
      </motion.div>
    </motion.div>
  )
}
