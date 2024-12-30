export default function VideoPlayer({ videoUrl }) {
  console.log(videoUrl)
  return (
    <div className="aspect-w-16 aspect-h-9  bg-gray-200">

      <video
        src={videoUrl}
        controls
        width="100%"
        height="100%"
        className={`w-full h-full object-cover rounded-sm  aspect-video `}
      />
    </div>
  )
}

