'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function RecommendedVideos({ currentVideoId }) {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    // Fetch recommended videos
    // This is a placeholder and should be replaced with actual API call
    const fetchRecommendedVideos = async () => {
      // const response = await fetch(`/api/recommended?currentVideo=${currentVideoId}`);
      // const data = await response.json();
      // setRecommendedVideos(data);

      // Placeholder data
      setRecommendedVideos(currentVideoId);
    };

    fetchRecommendedVideos();
  }, [currentVideoId]);

  return (
    (<div>
      <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>
      <div className="space-y-4">
        {recommendedVideos.map((video) => (
          <Link href={`/video/${video.id}`} key={video.id} className="flex space-x-2">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-40 h-24 object-cover" />
            <div>
              <h3 className="font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-500">{video.channel}</p>
              <p className="text-sm text-gray-500">{video.views} • {video.timestamp}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>)
  );
}

