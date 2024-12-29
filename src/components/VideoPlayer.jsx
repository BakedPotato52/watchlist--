export default function VideoPlayer({
  videoUrl
}) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
}

