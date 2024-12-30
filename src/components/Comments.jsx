'use client'
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


export default function Comments({ initialComments, videoId }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?videoId=${videoId}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const fetchedComments = await response.json();
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId, content: newComment }),
      });

      if (!response.ok) throw new Error('Failed to submit comment');

      const addedComment = await response.json();
      setComments(prevComments => [addedComment, ...prevComments]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="flex space-x-4 mb-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@username" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Comment'}
            </Button>
          </div>
        </div>
      </form>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <Avatar>
                <AvatarImage src={comment.user.avatarUrl || '/placeholder.svg?height=40&width=40'} alt={comment.user.name} />
                <AvatarFallback>{comment.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">
                  {comment.user.name} <span className="font-normal text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                </p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

