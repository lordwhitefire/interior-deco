// app/components/CommentThread.tsx
import * as React from "react";
import { useFetcher, useRevalidator } from "@remix-run/react";
import CommentForm from "./CommentForm";

type Comment = {
  _id: string;
  name: string;
  message: string;
  likes: number;
  likedBy?: { sessionId: string }[];
  _createdAt: string;
  parent?: { _id: string } | null;
  replies?: Comment[];
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
  children?: React.ReactNode;
  allComments: Comment[];
  onOptimisticAdd?: (fakeComment: Partial<Comment>, parentId?: string) => void;
};

export default function CommentThread({
  comment,
  depth,
  liked: initialLiked,
  likes: initialLikes,
  likeFetcher,
  commentFetcher,
  postId,
  slug,
  userName,
  userEmail,
  children,
  allComments,
  onOptimisticAdd,
}: Props) {
  const [showReply, setShowReply] = React.useState(false);
  const revalidator = useRevalidator();

  // Optimistic like state
  const [localLiked, setLocalLiked] = React.useState(initialLiked);
  const [localLikes, setLocalLikes] = React.useState(initialLikes);

  // Sync with server
  React.useEffect(() => {
    setLocalLiked(initialLiked);
    setLocalLikes(initialLikes);
  }, [initialLiked, initialLikes]);

  const toggleLike = () => {
    const newLiked = !localLiked;
    setLocalLiked(newLiked);
    setLocalLikes(newLiked ? localLikes + 1 : localLikes - 1);

    likeFetcher.submit(
      { _action: "likeComment", commentId: comment._id },
      { method: "post", action: `/blogs/${slug}`, replace: true }
    );
  };

  const tooDeep = depth >= 5;

  const handleOptimisticReply = (fakeComment: Partial<Comment>) => {
    onOptimisticAdd?.(fakeComment, comment._id);
    setShowReply(false);
  };

  React.useEffect(() => {
    if (commentFetcher.state === "idle" && commentFetcher.data && !commentFetcher.data.error) {
      revalidator.revalidate();
    }
  }, [commentFetcher.state, commentFetcher.data, revalidator]);

  return (
    <div className={`${depth > 0 ? "ml-6 border-l-2 border-gray-200 pl-4 mt-4" : "mb-6"}`}>
      <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
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

        <p className="mt-2 whitespace-pre-wrap text-gray-800">{comment.message}</p>

        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLike}
            disabled={likeFetcher.state !== "idle"}
            className={`flex items-center gap-1 text-sm ${
              localLiked ? "text-red-500" : "text-gray-500"
            } hover:text-red-500 disabled:opacity-50`}
            aria-pressed={localLiked}
          >
            <svg
              className="h-5 w-5"
              fill={localLiked ? "currentColor" : "none"}
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
            <span>{localLikes}</span>
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

      {showReply && (
        <div className="mt-4">
          <CommentForm
            fetcher={commentFetcher}  
            postId={postId}
            slug={slug}
            userName={userName}
            userEmail={userEmail}
            parentId={comment._id}
            onCancelReply={() => setShowReply(false)}
            onOptimisticAdd={handleOptimisticReply}
          />
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}