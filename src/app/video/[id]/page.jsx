import VideoPlayer from '../../../components/VideoPlayer'
import VideoDescription from '../../../components/VideoDescription'
import RecommendedVideos from '../../../components/RecommendedVideos'
import Comments from '../../../components/Comments'

export default function VideoPage(params) {
  const videoId = params.id;
  return (
    (<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 px-4">
        <VideoPlayer videoId={videoId} />
        <VideoDescription videoId={videoId} />
        <Comments videoId={videoId} />
      </div>
      <div>
        <RecommendedVideos currentVideoId={videoId} />
      </div>
    </div>)
  );
}

