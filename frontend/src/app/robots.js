import { toAbsoluteSiteUrl } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/courses", "/certificates", "/verify"],
        disallow: ["/admin", "/dashboard", "/auth"],
      },
    ],
    sitemap: toAbsoluteSiteUrl("/sitemap.xml"),
  };
}
