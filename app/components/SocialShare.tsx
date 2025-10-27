// app/components/SocialShare.tsx
type Props = { title: string };

export default function SocialShare({ title }: Props) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const encoded = encodeURIComponent(title);
  const share = {
    twitter:  `https://twitter.com/intent/tweet?text=${encoded}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  return (
    <div className="flex items-center gap-3 mt-6">
      <span className="text-sm text-gray-600">Share:</span>
      <a href={share.twitter}  target="_blank" rel="noreferrer" className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800">Twitter</a>
      <a href={share.facebook} target="_blank" rel="noreferrer" className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800">Facebook</a>
      <a href={share.linkedin} target="_blank" rel="noreferrer" className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800">LinkedIn</a>
    </div>
  );
}