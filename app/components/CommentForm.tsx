import { useEffect, useState } from "react";
import { Form } from "@remix-run/react";

type Props = { postId: string };

export default function CommentForm({ postId }: Props) {
  const [remember, setRemember] = useState(false);
  const [initial, setInitial] = useState({ name: "", email: "", website: "" });

  useEffect(() => {
    try {
      const raw = document.cookie.split("; ").find((r) => r.startsWith("commenter="));
      if (raw) setInitial(JSON.parse(decodeURIComponent(raw.split("=")[1])));
    } catch {}
  }, []);

  return (
    <Form method="post" className="space-y-4 mb-8">
      <input type="hidden" name="intent" value="comment" />
      <input type="hidden" name="postId" value={postId} />

      <div className="grid md:grid-cols-3 gap-4">
        <input name="name" defaultValue={initial.name} required placeholder="Name" className="input" />
        <input name="email" type="email" defaultValue={initial.email} required placeholder="Email" className="input" />
        <input name="website" defaultValue={initial.website} placeholder="Website (optional)" className="input" />
      </div>
      <textarea name="message" required rows={4} placeholder="Message" className="input" />
      <div className="flex items-center gap-2">
        <input
          id="remember"
          type="checkbox"
          className="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <label htmlFor="remember" className="text-sm">Remember my details for next time</label>
      </div>
      <button type="submit" className="px-4 py-2 bg-black text-white rounded">Send now</button>
    </Form>
  );
}