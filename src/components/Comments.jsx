'use client'
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


export default function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real application, you would fetch comments from an API
        // For now, we'll simulate an API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulated comments dat

        setComments(videoId);
      } catch (err) {
        setError('Failed to load comments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

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
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.user} />
                <AvatarFallback>{comment.user.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">
                  {comment.user} <span className="font-normal text-sm text-gray-500">{comment.timestamp}</span>
                </p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>)
  );
}

