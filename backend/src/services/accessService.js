const hasProAccess = (user) =>
  Boolean(
    user &&
      (user.role === "admin" ||
        (user.plan === "pro" && user.planStatus === "active"))
  );

const hasCourseAccess = (user, course) => {
  if (!course || course.access !== "pro") {
    return true;
  }

  return hasProAccess(user);
};

const serializeCourseForViewer = (course, user) => {
  const source = typeof course.toObject === "function" ? course.toObject() : { ...course };
  const granted = hasCourseAccess(user, source);
  const requiresUpgrade = source.access === "pro" && !granted;

  if (!requiresUpgrade) {
    return {
      course: source,
      access: {
        granted: true,
        requiresUpgrade: false,
        plan: source.access || "free",
      },
    };
  }

  return {
    course: {
      ...source,
      videoUrl: "",
      externalLink: "",
      lessons: Array.isArray(source.lessons)
        ? source.lessons.map((lesson) => ({
            lessonId: lesson.lessonId,
            title: lesson.title,
            duration: lesson.duration || "",
            order: lesson.order || 0,
          }))
        : [],
    },
    access: {
      granted: false,
      requiresUpgrade: true,
      plan: "pro",
      reason: "Upgrade to Pro to unlock full lesson content and project assets.",
    },
  };
};

module.exports = {
  hasProAccess,
  hasCourseAccess,
  serializeCourseForViewer,
};
