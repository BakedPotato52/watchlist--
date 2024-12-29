'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function RecommendedVideos({ currentVideoId }) {
  const [recommendedVideos, setRecommendedVideos] = useState([]);


  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        const response = await fetch(`/api/recommended-videos?currentVideoId=${currentVideoId}`);
        if (!response.ok) throw new Error('Failed to fetch recommended videos');
        const videos = await response.json();
        setRecommendedVideos(videos);
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      }
    };

    fetchRecommendedVideos();
  }, [currentVideoId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>
      {recommendedVideos.length === 0 ? (
        <p>No recommended videos available.</p>
      ) : (
        <div className="space-y-4">
          {recommendedVideos.map((video) => (
            <Link href={`/video/${video.id}`} key={video.id} className="flex space-x-2">
              <div className="relative w-40 h-24">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.user}</p>
                <p className="text-sm text-gray-500">{video.views} • {video.updatedAt.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

