import { notFound } from 'next/navigation'
import VideoPlayer from '../../../components/VideoPlayer'
import VideoDescription from '../../../components/VideoDescription'
import RecommendedVideos from '../../../components/RecommendedVideos'
import Comments from '../../../components/Comments'
import { getVideoData } from '@/lib/getVideoData'

export default async function VideoPage({ params }) {
  const videoId = await params.id;

  try {
    const videoData = await getVideoData(videoId);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 px-4">
          <VideoPlayer videoUrl={videoData.url} />
          <VideoDescription video={videoData} />
          <Comments videoId={videoId} />
        </div>
        <div>
          <RecommendedVideos currentVideoId={videoId} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching video data:', error);
    notFound();
  }
}

