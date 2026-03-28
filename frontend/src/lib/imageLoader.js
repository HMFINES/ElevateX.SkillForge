const OPTIMIZABLE_HOSTS = new Set([
  "images.unsplash.com",
  "res.cloudinary.com",
]);

const getUrl = (src) => {
  if (!src) {
    return null;
  }

  try {
    return new URL(src);
  } catch (_error) {
    return null;
  }
};

export function canOptimizeExternalImage(src = "") {
  if (!src || src.startsWith("/")) {
    return true;
  }

  const url = getUrl(src);
  return Boolean(url && OPTIMIZABLE_HOSTS.has(url.hostname));
}

export function passthroughImageLoader({ src, width, quality }) {
  if (!src || src.startsWith("/")) {
    return src;
  }

  const url = getUrl(src);
  if (!url) {
    return src;
  }

  if (url.hostname === "images.unsplash.com") {
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality || 75));
    return url.toString();
  }

  if (url.hostname === "res.cloudinary.com") {
    return src.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }

  return src;
}
