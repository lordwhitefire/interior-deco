import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import type { SerializeFrom } from "@remix-run/node";

type Comment = SerializeFrom<typeof loader>["topLevel"][number];

export default function CommentThread({ comments, postId }: { comments: Comment[]; postId: string }) {
  return (
    <div className="space-y-6">
      {comments.map((c) => (
        <CommentItem key={c._id} c={c} postId={postId} />
      ))}
    </div>
  );
}

function CommentItem({ c, postId }: { c: Comment; postId: string }) {
  const fetcher = useFetcher();
  const [showReply, setShowReply] = useState(false);

  const like = () => fetcher.submit({ intent: "like", commentId: c._id }, { method: "post" });

  return (
    <div className="border-l-2 border-gray-200 pl-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold">{c.name}</span>
          <span className="text-xs text-gray-500 ml-2">{new Date(c._createdAt).toLocaleDateString()}</span>
        </div>
        <button onClick={like} className="text-xs text-gray-600 hover:text-black">❤ {c.likes}</button>
      </div>
      <p className="mt-2 text-gray-800">{c.message}</p>
      <button onClick={() => setShowReply((s) => !s)} className="text-xs text-blue-600 mt-2">Reply</button>

      {showReply && (
        <fetcher.Form method="post" className="mt-3 space-y-2">
          <input type="hidden" name="intent" value="reply" />
          <input type="hidden" name="parentId" value={c._id} />
          <input type="hidden" name="postId" value={postId} />
          <div className="flex gap-2">
            <input name="name" required placeholder="Name" className="input w-32" />
            <input name="email" type="email" required placeholder="Email" className="input w-40" />
            <input name="website" placeholder="Website" className="input w-40" />
          </div>
          <textarea name="message" required rows={2} placeholder="Write a reply…" className="input" />
          <button type="submit" className="text-sm px-3 py-1 bg-black text-white rounded">Reply</button>
        </fetcher.Form>
      )}

      {c.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {c.replies.map((r) => (
            <div key={r._id} className="text-sm bg-gray-50 p-3 rounded">
              <div className="flex items-center justify-between">
                <span className="font-medium">{r.name}</span>
                <span className="text-xs text-gray-500">{new Date(r._createdAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-1">{r.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}