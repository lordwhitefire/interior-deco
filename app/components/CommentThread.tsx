// app/components/CommentThread.tsx
// Renders one comment + its nested children.
// Props: comment data, depth, like state, fetchers, and the new slug/user props.

import * as React from "react";
import { Form, useFetcher } from "@remix-run/react";
import CommentForm from "./CommentForm";

type Comment = {
  _id: string;
  name: string;
  message: string;
  likes: number;
  likedBy?: { sessionId: string }[];
  _createdAt: string;
  parent?: { _id: string } | null;
};

type Props = {
  comment: Comment;
  depth: number;
  liked: boolean;
  likes: number;
  likeFetcher: ReturnType<typeof useFetcher>;
  commentFetcher: ReturnType<typeof useFetcher>;
  postId: string;
  slug: string;
  userName?: string;
  userEmail?: string;
  children?: React.ReactNode; // nested replies
};

export default function CommentThread({
  comment,
  depth,
  liked,
  likes,
  likeFetcher,
  commentFetcher,
  postId,
  slug,
  userName,
  userEmail,
  children,
}: Props) {
  const [showReply, setShowReply] = React.useState(false);

  // Heart icon toggles like/unlike
  const toggleLike = () => {
    likeFetcher.submit(
      { _action: "likeComment", commentId: comment._id },
      { method: "post", action: `/blogs/${slug}`, replace: true }
    );
  };

  // Cap nesting depth for UI sanity
  const tooDeep = depth >= 5;

  return (
    <div className={`${depth > 0 ? "ml-6 border-l-2 border-gray-200 pl-4 mt-4" : "mb-6"}`}>
      <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
        {/* Author & date */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{comment.name}</span>
          <time dateTime={comment._createdAt}>
            {new Date(comment._createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>

        {/* Message */}
        <p className="mt-2 whitespace-pre-wrap text-gray-800">{comment.message}</p>

        {/* Like + Reply buttons */}
        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLike}
            disabled={likeFetcher.state !== "idle"}
            className={`flex items-center gap-1 text-sm ${
              liked ? "text-red-500" : "text-gray-500"
            } hover:text-red-500 disabled:opacity-50`}
            aria-pressed={liked}
          >
            <svg
              className="h-5 w-5"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
            <span>{likes}</span>
          </button>

          {!tooDeep && (
            <button
              type="button"
              onClick={() => setShowReply((s) => !s)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Reply
            </button>
          )}
        </div>
      </div>

      {/* Reply form (hidden until clicked) */}
      {showReply && (
        <div className="mt-4">
          <CommentForm
            postId={postId}
            slug={slug}
            userName={userName}
            userEmail={userEmail}
            parentId={comment._id}
            onCancelReply={() => setShowReply(false)}
            fetcher={commentFetcher}
          />
        </div>
      )}

      {/* Nested replies */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}