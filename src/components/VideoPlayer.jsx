export default function VideoPlayer({
  videoId
}) {
  return (
    <div className="flex justify-center">
      <video
        className='w-full'
        src={`/video/${videoId}`}
        controls
        height={480}
        width={854}
        style={{
          aspectRatio: "854/480",
          objectFit: "contain",
          borderRadius: "10px",
          backgroundColor: "black",
        }}
      />
    </div>
  );
}

