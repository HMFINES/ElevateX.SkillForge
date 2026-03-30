import { siteConfig, toAbsoluteSiteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/courses",
  "/certificates",
  "/verify",
];

const fetchCourseEntries = async () => {
  try {
    const response = await fetch(`${siteConfig.apiBaseUrl}/courses`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    const courses = payload?.data?.courses || payload?.courses || [];

    return courses
      .filter((course) => course?.slug)
      .map((course) => ({
        url: toAbsoluteSiteUrl(`/courses/${course.slug}`),
        lastModified: course.updatedAt || new Date().toISOString(),
        changeFrequency: "weekly",
        priority: course.access === "pro" ? 0.7 : 0.8,
      }));
  } catch (_error) {
    return [];
  }
};

export default async function sitemap() {
  const courseEntries = await fetchCourseEntries();

  return [
    ...staticRoutes.map((route, index) => ({
      url: toAbsoluteSiteUrl(route),
      lastModified: new Date().toISOString(),
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: index === 0 ? 1 : 0.8,
    })),
    ...courseEntries,
  ];
}
