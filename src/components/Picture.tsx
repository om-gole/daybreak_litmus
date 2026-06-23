interface PictureProps {
  /** base path without extension, e.g. "/coffees-flatlay" */
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** decorative images pass "" + aria-hidden */
  loading?: "lazy" | "eager";
}

/**
 * <picture> with a WebP source + JPEG fallback. Intrinsic width/height are set
 * to reserve space (no layout shift); decoding is async so it never blocks the
 * main thread.
 */
export function Picture({
  src,
  alt,
  width,
  height,
  className,
  loading = "lazy",
}: PictureProps) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
