'use client'
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


export default function Comments({ initialComments, videoId }) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (!newComment.trim()) return

          setIsSubmitting(true)
          try {
            const response = await fetch('/api/comments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ videoId, content: newComment })
            })

            if (!response.ok) throw new Error('Failed to post comment')

            const newCommentData = await response.json()
            setComments(prev => [newCommentData, ...prev])
            setNewComment('')
          } catch (error) {
            console.error('Error posting comment:', error)
          } finally {
            setIsSubmitting(false)
          }
        }}
        className="flex space-x-4 mb-4"
      >
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? 'Posting...' : 'Comment'}
            </Button>
          </div>
        </div>
      </form>
      {comments.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <Avatar>
                <AvatarImage
                  src={comment.user.avatarUrl || "/placeholder.svg?height=40&width=40"}
                  alt={`${comment.user.username}'s avatar`}
                />
                <AvatarFallback>{comment.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">
                  {comment.user.username}{' '}
                  <span className="font-normal text-sm text-muted-foreground">
                    {formatDate(comment.createdAt)}
                  </span>
                </p>
                <p className="mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

