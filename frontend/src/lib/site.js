const normalizeUrl = (value, fallback) => {
  try {
    const url = new URL(value || fallback);
    return url.toString().replace(/\/$/, "");
  } catch (_error) {
    return fallback.replace(/\/$/, "");
  }
};

export const siteConfig = {
  name: "ElevateX",
  description:
    "ElevateX is an AI-guided career learning platform for students in India to learn skills, build projects, earn verifiable certificates, and get placement-ready faster.",
  siteUrl: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"),
  apiBaseUrl: normalizeUrl(
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:5000/api/v2"
  ),
};

export const publicBaseUrl = (() => {
  try {
    const url = new URL(siteConfig.apiBaseUrl);
    const normalizedPath = url.pathname.replace(/\/$/, "");
    return normalizedPath.endsWith("/api")
      ? `${url.origin}${normalizedPath.slice(0, -4)}`
      : url.origin;
  } catch (_error) {
    return siteConfig.apiBaseUrl.replace(/\/api\/?$/, "");
  }
})();

export const toAbsoluteSiteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${siteConfig.siteUrl}/`).toString();
};
