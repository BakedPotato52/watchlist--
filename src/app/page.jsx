import Link from "next/link";

export default function Home() {
    return (
        <div className="grid">
            <div className="gap-2 p-6 h-auto bg-gradient-to-br from-[#f16f66] to-[#0066ff]">
                <h1 className='text-4xl font-bold pb-6'>Videos</h1>


                <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Data.map((video) => (
                        <div key={video.id}>
                            <Link to={`/Video/${video.id}`} className="rounded-lg block"> {/*href={() => (window.location.pathname = video.videoSRC)} */}
                                <div className="group relative aspect-video overflow-hidden rounded-lg">
                                    <img
                                        alt="Pop Music"
                                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                        src={video.thumbnail}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/70 p-6 transition-opacity duration-300 group-hover:opacity-100">
                                        <h3 className="text-2xl font-bold text-white">{video.videoTitle}</h3>
                                        <p className="mt-2 text-gray-300">{video.Views} &bull; {video.Time}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}


