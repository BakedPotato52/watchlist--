import Link from 'next/link'

const recommendedVideos = [
  { id: '1', title: 'Recommended Video 1', thumbnail: '/placeholder.svg?height=120&width=200', channel: 'Channel 1', views: '100K views', timestamp: '1 day ago' },
  { id: '2', title: 'Recommended Video 2', thumbnail: '/placeholder.svg?height=120&width=200', channel: 'Channel 2', views: '200K views', timestamp: '2 days ago' },
  { id: '3', title: 'Recommended Video 3', thumbnail: '/placeholder.svg?height=120&width=200', channel: 'Channel 3', views: '300K views', timestamp: '3 days ago' },
  // Add more recommended videos as needed
]

export default function RecommendedVideos() {
  return (
    (<div>
      <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>
      <div className="space-y-4">
        {recommendedVideos.map((video) => (
          <Link href={`/watch?v=${video.id}`} key={video.id} className="flex space-x-2">
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

