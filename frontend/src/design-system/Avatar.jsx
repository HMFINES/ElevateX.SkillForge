import Image from "next/image";
import clsx from "clsx";
import {
  canOptimizeExternalImage,
  passthroughImageLoader,
} from "@/lib/imageLoader";

const sizeStyles = {
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-lg",
};

const imageSizes = {
  sm: 40,
  md: 48,
  lg: 64,
};

export default function Avatar({ src, fallback = "SF", size = "md", className }) {
  const imageSize = imageSizes[size] || imageSizes.md;

  return src ? (
    <Image
      loader={passthroughImageLoader}
      unoptimized={!canOptimizeExternalImage(src)}
      src={src}
      alt={`${fallback} avatar`}
      width={imageSize}
      height={imageSize}
      className={clsx(
        "rounded-full border border-line object-cover",
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    />
  ) : (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-full border border-line bg-brand-500/12 font-semibold text-brand-500",
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      {fallback}
    </div>
  );
}
