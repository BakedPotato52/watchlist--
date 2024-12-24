import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Download } from 'lucide-react'

export default function VideoDescription() {
  return (
    (<div className='mt-4'>
      <h1 className="text-lg text-black font-bold">Video 1</h1>
      <div className="flex justify-between text-black items-center text-sm md:col-span-4 px-4">
        <div className="flex items-center">
          <img
            src="/globe.svg?height=20&width=20"
            alt="Channel Avatar"
            className="rounded-full" />
          <div>
            <p className="font-semibold">Channel Name</p>
            <p className="text-sm text-gray-500">1M subscribers</p>
          </div>
          <Button>Subscribe</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <ThumbsUp className="mr-2 h-4 w-4" /> 100K
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <ThumbsDown className="mr-2 h-4 w-4" /> 1K
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      </div>

    </div >)
  );
}

