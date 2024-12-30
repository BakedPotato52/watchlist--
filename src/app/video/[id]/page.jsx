import { notFound } from 'next/navigation'
import VideoPlayer from '../../../components/VideoPlayer'
import VideoDescription from '../../../components/VideoDescription'
import RecommendedVideos from '../../../components/RecommendedVideos'
import Comments from '../../../components/Comments'
import { getVideoData } from '@/lib/getVideoData'
import { getRecommendedVideos } from '@/app/api/recommended-videos'
import { getComments } from '@/app/api/comments'

export default async function VideoPage({ params }) {
  if (!params?.id) {
    notFound()
  }
  const videoId = params.id;

  try {
    const videoData = await getVideoData(videoId);
    const initialRecommendedVideos = await getRecommendedVideos(videoId);
    const initialComments = await getComments(videoId);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 px-4">
          <VideoPlayer videoUrl={videoData.url} />
          <VideoDescription video={videoData} />
          <Comments initialComments={initialComments} videoId={videoId} />
        </div>
        <div>
          <RecommendedVideos initialVideos={initialRecommendedVideos} currentVideoId={videoId} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching video data:', error);
    notFound();
  }
}

