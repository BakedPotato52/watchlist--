import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const comments = [
  { id: '1', user: 'User 1', avatar: '/placeholder.svg?height=32&width=32', content: 'Great video! Thanks for sharing.', timestamp: '2 hours ago' },
  { id: '2', user: 'User 2', avatar: '/placeholder.svg?height=32&width=32', content: 'I learned a lot from this. Keep up the good work!', timestamp: '1 day ago' },
  // Add more comments as needed
]

export default function Comments() {
  return (
    (<div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <div className="flex space-x-4 mb-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@username" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea placeholder="Add a comment..." />
          <div className="mt-2 flex justify-end">
            <Button>Comment</Button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.user} />
              <AvatarFallback>{comment.user.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{comment.user} <span className="font-normal text-sm text-gray-500">{comment.timestamp}</span></p>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>)
  );
}

