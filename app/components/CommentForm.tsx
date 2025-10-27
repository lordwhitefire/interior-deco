import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";

type Props = { 
  postId: string;
  parentId?: string | null;
  onCancelReply?: () => void;
};

export default function CommentForm({ postId, parentId, onCancelReply }: Props) {
  const [remember, setRemember] = useState(false);
  const [initial, setInitial] = useState({ name: "", email: "", website: "" });
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    try {
      const raw = document.cookie.split("; ").find((r) => r.startsWith("commenter="));
      if (raw) setInitial(JSON.parse(decodeURIComponent(raw.split("=")[1])));
    } catch {}
  }, []);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      // Success case - reset form and handle remember me
      if (!fetcher.data.error) {
        if (remember) {
          const formData = new FormData();
          formData.append("name", initial.name);
          formData.append("email", initial.email);
          formData.append("website", initial.website);
          // Set cookie logic would go here
        }
        
        // Reset form
        const form = document.querySelector('form') as HTMLFormElement;
        if (form && !parentId) { // Only reset for top-level forms, not replies
          form.reset();
        }
        
        // Close reply form if open
        if (onCancelReply) {
          onCancelReply();
        }
      }
    }
  }, [fetcher.state, fetcher.data, remember, initial, parentId, onCancelReply]);

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
      
      <fetcher.Form method="post" className="space-y-4">
        <input type="hidden" name="_action" value="createComment" />
        <input type="hidden" name="postId" value={postId} />
        {parentId && (
          <input type="hidden" name="parentId" value={parentId} />
        )}

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
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {fetcher.data.error}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              id={`remember-${parentId || 'main'}`}
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={isSubmitting}
            />
            <label 
              htmlFor={`remember-${parentId || 'main'}`} 
              className="text-sm text-gray-600"
            >
              Remember my details for next time
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : (parentId ? "Post Reply" : "Post Comment")}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}