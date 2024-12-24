import VideoPlayer from '../components/VideoPlayer'
import VideoDescription from '../components/VideoDescription'
import RecommendedVideos from '../components/RecommendedVideos'
import Comments from '../components/Comments'

export default function Home() {
  return (
    (<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 px-4 ">
        <VideoPlayer videoId="dQw4w9WgXcQ" />
        <VideoDescription />
        <Comments />
      </div>
      <div>
        <RecommendedVideos />
      </div>
    </div>)
  );
}

