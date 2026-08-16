import type { ImgHTMLAttributes } from "react";

const SANITY_CDN = "cdn.sanity.io";
const DEFAULT_WIDTHS = [640, 1024, 1600, 1920];

type ResponsiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  widths?: number[];
  "aria-hidden"?: boolean | "true" | "false";
} & Pick<ImgHTMLAttributes<HTMLImageElement>, "width" | "height">;

function setParam(url: string, key: string, value: string) {
  const [base, qs = ""] = url.split("?");
  const params = qs
    .split("&")
    .filter(Boolean)
    .filter((p) => !p.startsWith(`${key}=`));
  params.push(`${key}=${value}`);
  return `${base}?${params.join("&")}`;
}

function parseIntrinsicSize(src: string) {
  const m = src.match(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp|avif|gif)/);
  if (!m) return null;
  return { width: Number(m[1]), height: Number(m[2]) };
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  loading,
  fetchPriority,
  sizes = "100vw",
  widths = DEFAULT_WIDTHS,
  width,
  height,
  "aria-hidden": ariaHidden,
}: ResponsiveImageProps) {
  if (!src) return null;
  const isSanity = src.includes(SANITY_CDN);
  const srcset = isSanity
    ? widths.map((w) => `${setParam(src, "w", String(w))} ${w}w`).join(", ")
    : undefined;
  const optimized = isSanity ? setParam(setParam(src, "auto", "format"), "q", "85") : src;
  const intrinsic = parseIntrinsicSize(src);

  return (
    <img
      src={optimized}
      srcSet={srcset}
      sizes={srcset ? sizes : undefined}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      aria-hidden={ariaHidden}
      width={width ?? intrinsic?.width}
      height={height ?? intrinsic?.height}
    />
  );
}