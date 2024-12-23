import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Download } from 'lucide-react'

export default function VideoDescription() {
  return (
    (<div className="mt-4">
      <h1 className="text-2xl font-bold">Video Title</h1>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Channel Avatar"
            className="rounded-full" />
          <div>
            <p className="font-semibold">Channel Name</p>
            <p className="text-sm text-gray-500">1M subscribers</p>
          </div>
          <Button>Subscribe</Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" /> 100K
          </Button>
          <Button variant="outline" size="sm">
            <ThumbsDown className="mr-2 h-4 w-4" /> 1K
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-700">
        This is the video description. It can contain multiple lines of text describing the content of the video.
      </p>
    </div>)
  );
}

