// app/components/PaginationFooter.tsx
import { useState } from "react";

type Props = { total: number; pageSize?: number };
export default function PaginationFooter({ total, pageSize = 9 }: Props) {
  const [page, setPage] = useState(1);
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 pb-16">
      <div className="flex justify-center items-center gap-2">
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`px-4 py-2 rounded-lg border ${
              n === page
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-700 border-stone-300 hover:border-stone-400"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}