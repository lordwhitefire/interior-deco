// app/components/CommentForm.tsx
import { useEffect, useState } from "react";
import { useFetcher, type FetcherWithComponents } from "@remix-run/react";

type Comment = {
  _id: string;
  name: string;
  message: string;
  _createdAt: string;
  likes: number;
  parent?: { _id: string } | null;
};

type Props = {
  postId: string;
  slug: string;
  userName?: string;
  userEmail?: string;
  parentId?: string | null;
  onCancelReply?: () => void;
  onOptimisticAdd?: (comment: Partial<Comment>, parentId?: string) => void;
  fetcher?: FetcherWithComponents<{ error?: string; newComment?: any }>;
};

export default function CommentForm({
  postId,
  slug,
  userName = "",
  userEmail = "",
  parentId,
  onCancelReply,
  onOptimisticAdd,
  fetcher: propFetcher,
}: Props) {
  const [remember, setRemember] = useState(false);
  const [initial, setInitial] = useState({ name: userName, email: userEmail, website: "" });
  const [savedValues, setSavedValues] = useState({ name: "", email: "", website: "" }); // ← NEW

  const fetcher = propFetcher || useFetcher<{ error?: string; newComment?: any }>();
  const isSubmitting = fetcher.state !== "idle";

  // Sync props (auto-fill from cookie)
  useEffect(() => {
    console.log("FORM: Received props → userName:", userName, "userEmail:", userEmail);
    setInitial({ name: userName, email: userEmail, website: "" });
  }, [userName, userEmail]);

  // Handle success: reset + remember me
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && !fetcher.data.error) {
      if (!parentId) {
        const form = document.querySelector(
          `form[data-form-id="${parentId || "top"}"]`
        ) as HTMLFormElement | null;
        form?.reset();
      }
      onCancelReply?.();

      // Save REAL values to cookie
      if (remember && savedValues.name) {
        const data = {
          name: savedValues.name,
          email: savedValues.email,
          website: savedValues.website,
        };
        const encoded = encodeURIComponent(JSON.stringify(data));
        const cookieStr = `commenter=${encoded}; max-age=31536000; path=/; SameSite=Strict`;
        document.cookie = cookieStr;
        console.log("FORM: Saved REAL values to cookie:", data);
      }

      setSavedValues({ name: "", email: "", website: "" }); // reset
    }
  }, [fetcher.state, fetcher.data, onCancelReply, parentId, remember, savedValues]);

  // Handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;

    // READ VALUES BEFORE SUBMIT (critical!)
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const website = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";

    // Save for success handler
    setSavedValues({ name, email, website });

    const formData = new FormData(form);
    const message = formData.get("message") as string;

    const fakeComment: Partial<Comment> = {
      _id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name || "Anonymous",
      message,
      _createdAt: new Date().toISOString(),
      likes: 0,
      parent: parentId ? { _id: parentId } : null,
    };

    onOptimisticAdd?.(fakeComment, parentId || undefined);

    fetcher.submit(formData, {
      method: "post",
      action: `/blogs/${slug}#comments`,
    });
  };

  return (
    <div className={parentId ? "ml-8 border-l-2 border-gray-200 pl-4 mt-4" : "mb-8"}>
      {parentId && (
        <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">Replying to comment</p>
          <button
            type="button"
            onClick={onCancelReply}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Cancel Reply
          </button>
        </div>
      )}

      <fetcher.Form
        method="post"
        action={`/blogs/${slug}#comments`}
        data-form-id={parentId || "top"}
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_action" value="createComment" />
        <input type="hidden" name="postId" value={postId} />
        {parentId && <input type="hidden" name="parentId" value={parentId} />}

        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="name"
            defaultValue={initial.name}
            required
            placeholder="Name *"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <input
            name="email"
            type="email"
            defaultValue={initial.email}
            required
            placeholder="Email *"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <input
            name="website"
            defaultValue={initial.website}
            placeholder="Website (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>

        <textarea
          name="message"
          required
          rows={4}
          placeholder="Your message *"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />

        {fetcher.data?.error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{fetcher.data.error}</div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              id={`remember-${parentId || "main"}`}
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={isSubmitting}
            />
            <label htmlFor={`remember-${parentId || "main"}`} className="text-sm text-gray-600">
              Remember my details for next time
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : parentId ? "Post Reply" : "Post Comment"}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}