import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import type { SerializeFrom } from "@remix-run/node";
import CommentForm from "./CommentForm";

type Comment = {
  _id: string;
  name: string;
  email: string;
  website?: string;
  message: string;
  likes: number;
  _createdAt: string;
  parent?: { _id: string };
};

type CommentThreadProps = {
  comments: Comment[];
  postId: string;
};

export default function CommentThread({ comments, postId }: CommentThreadProps) {
  // Group comments by parent to build thread structure
  const commentMap = new Map<string, Comment[]>();
  const rootComments: Comment[] = [];

  comments.forEach(comment => {
    if (comment.parent?._id) {
      const parentId = comment.parent._id;
      if (!commentMap.has(parentId)) {
        commentMap.set(parentId, []);
      }
      commentMap.get(parentId)!.push(comment);
    } else {
      rootComments.push(comment);
    }
  });

  const renderComments = (commentList: Comment[], depth = 0) => {
    return commentList.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
        depth={depth}
        postId={postId}
        replies={commentMap.get(comment._id) || []}
        renderComments={renderComments}
      />
    ));
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return <div className="space-y-6">{renderComments(rootComments)}</div>;
}

type CommentItemProps = {
  comment: Comment;
  depth: number;
  postId: string;
  replies: Comment[];
  renderComments: (comments: Comment[], depth: number) => JSX.Element[];
};

function CommentItem({ comment, depth, postId, replies, renderComments }: CommentItemProps) {
  const likeFetcher = useFetcher();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const isLiking = likeFetcher.state === "submitting";

  const handleLike = () => {
    if (!isLiking) {
      likeFetcher.submit(
        { 
          _action: "likeComment", 
          commentId: comment._id 
        }, 
        { method: "post" }
      );
    }
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className={`border-l-2 border-gray-200 pl-4 ${
        depth > 0 ? 'ml-6' : ''
      }`}
      style={{ marginLeft: depth > 0 ? `${depth * 1.5}rem` : '0' }}
    >
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
              {comment.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{comment.name}</h4>
              <p className="text-sm text-gray-500">
                {formatDate(comment._createdAt)}
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{comment.message}</p>
        
        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 disabled:opacity-50 transition-colors"
          >
            <svg 
              className="w-4 h-4" 
              fill={comment.likes > 0 ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" 
              />
            </svg>
            <span>{comment.likes || 0}</span>
          </button>
          
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-gray-500 hover:text-blue-500 transition-colors"
          >
            {showReplyForm ? "Cancel Reply" : "Reply"}
          </button>
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4">
            <CommentForm 
              postId={postId} 
              parentId={comment._id}
              onCancelReply={handleCancelReply}
            />
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {replies.length > 0 && (
        <div className="mt-4">
          {renderComments(replies, depth + 1)}
        </div>
      )}
    </div>
  );
}