"use client";

import { useCallback, useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

const createLesson = (index = 1) => ({
  lessonId: `lesson-${index}`,
  title: "",
  description: "",
  videoUrl: "",
  duration: "",
  order: index,
});

const initialCourseState = {
  title: "",
  description: "",
  category: "AI",
  level: "Beginner",
  duration: "",
  thumbnail: "",
  provider: "ElevateX",
  access: "free",
  badgeText: "",
  tagsText: "",
  published: true,
  isExternal: false,
  externalLink: "",
  lessons: [createLesson(1)],
};

const mapCourseToForm = (course) => ({
  title: course.title || "",
  description: course.description || "",
  category: course.category || "AI",
  level: course.level || "Beginner",
  duration: course.duration || "",
  thumbnail: course.thumbnail || "",
  provider: course.provider || "ElevateX",
  access: course.access || "free",
  badgeText: course.badgeText || "",
  tagsText: (course.tags || []).join(", "),
  published: typeof course.published === "boolean" ? course.published : true,
  isExternal: Boolean(course.isExternal),
  externalLink: course.externalLink || "",
  lessons: course.lessons?.length
    ? course.lessons.map((lesson, index) => ({
        lessonId: lesson.lessonId || `lesson-${index + 1}`,
        title: lesson.title || "",
        description: lesson.description || "",
        videoUrl: lesson.videoUrl || "",
        duration: lesson.duration || "",
        order: lesson.order || index + 1,
      }))
    : [createLesson(1)],
});

const buildCoursePayload = (courseForm) => ({
  title: courseForm.title.trim(),
  description: courseForm.description.trim(),
  category: courseForm.category,
  level: courseForm.level,
  duration: courseForm.duration.trim(),
  thumbnail: courseForm.thumbnail.trim(),
  provider: courseForm.provider.trim() || "ElevateX",
  access: courseForm.access,
  badgeText: courseForm.badgeText.trim(),
  isExternal: courseForm.isExternal,
  externalLink: courseForm.externalLink.trim(),
  published: courseForm.published,
  tags: courseForm.tagsText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean),
  lessons: courseForm.isExternal
    ? []
    : courseForm.lessons
        .filter((lesson) => lesson.title.trim())
        .map((lesson, index) => ({
          lessonId: lesson.lessonId || `lesson-${index + 1}`,
          title: lesson.title.trim(),
          description: lesson.description.trim(),
          videoUrl: lesson.videoUrl.trim(),
          duration: lesson.duration.trim(),
          order: index + 1,
        })),
});

export default function AdminPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState(initialCourseState);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [message, setMessage] = useState("");

  const loadData = useCallback(async () => {
    if (!token) return;
    const [usersResponse, coursesResponse] = await Promise.all([
      api.adminUsers(token),
      api.adminCourses(token),
    ]);
    setUsers(usersResponse.users || []);
    setCourses(coursesResponse.courses || []);
  }, [token]);

  useEffect(() => {
    loadData().catch((error) => setMessage(error.message));
  }, [loadData]);

  const updateLesson = (index, field, value) => {
    setCourseForm((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson, lessonIndex) =>
        lessonIndex === index ? { ...lesson, [field]: value } : lesson
      ),
    }));
  };

  const addLesson = () => {
    setCourseForm((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        createLesson(prev.lessons.length + 1),
      ],
    }));
  };

  const removeLesson = (index) => {
    setCourseForm((prev) => {
      const nextLessons = prev.lessons
        .filter((_, lessonIndex) => lessonIndex !== index)
        .map((lesson, lessonIndex) => ({
          ...lesson,
          order: lessonIndex + 1,
          lessonId: lesson.lessonId || `lesson-${lessonIndex + 1}`,
        }));

      return {
        ...prev,
        lessons: nextLessons.length ? nextLessons : [createLesson(1)],
      };
    });
  };

  const resetCourseForm = () => {
    setCourseForm(initialCourseState);
    setEditingCourseId(null);
  };

  const handleCreateOrUpdateCourse = async (event) => {
    event.preventDefault();
    const payload = buildCoursePayload(courseForm);

    if (editingCourseId) {
      await api.adminUpdateCourse(token, editingCourseId, payload);
      setMessage("Course updated successfully.");
    } else {
      await api.adminCreateCourse(token, payload);
      setMessage("Course created successfully.");
    }

    resetCourseForm();
    await loadData();
  };

  const handleEditCourse = (course) => {
    setCourseForm(mapCourseToForm(course));
    setEditingCourseId(course._id);
    setMessage(`Editing ${course.title}`);
  };

  const handleDeleteCourse = async (courseId) => {
    await api.adminDeleteCourse(token, courseId);
    setMessage("Course deleted.");

    if (editingCourseId === courseId) {
      resetCourseForm();
    }

    await loadData();
  };

  const handleManualCertificate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await api.adminIssueCertificate(token, {
      userId: formData.get("userId"),
      courseId: formData.get("courseId"),
    });
    setMessage("Certificate issued manually.");
    event.currentTarget.reset();
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file");
    if (!file || !(file instanceof File)) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("resourceType", formData.get("resourceType"));
    uploadData.append("folder", "elevatex/admin");

    const response = await fetch(`${api.baseUrl}/admin/uploads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: uploadData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Upload failed");
    }

    setMessage(`Uploaded asset: ${data.url}`);
    event.currentTarget.reset();
  };

  return (
    <AuthGuard adminOnly>
      <div className="shell pb-20">
        <div className="section-copy">
          <div className="eyebrow">Admin Panel</div>
          <h1 className="font-display text-5xl font-semibold tracking-tight">
            Manage courses, learners, uploads, and certificates.
          </h1>
          <p className="text-base leading-8 text-muted">
            This admin workspace lets ElevateX control internal course inventory,
            external course recommendations, media assets, users, and manual certificate issuance.
          </p>
        </div>

        {message ? <div className="mt-6 glass-card p-4 text-sm text-accent">{message}</div> : null}

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleCreateOrUpdateCourse} className="glass-card space-y-4 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl font-semibold">
                {editingCourseId ? "Edit course" : "Create course"}
              </h2>
              {editingCourseId ? (
                <button
                  type="button"
                  onClick={resetCourseForm}
                  className="button-secondary"
                >
                  Cancel edit
                </button>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="input"
                placeholder="Title"
                value={courseForm.title}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, title: event.target.value }))
                }
              />
              <select
                className="input"
                value={courseForm.category}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, category: event.target.value }))
                }
              >
                {["AI", "Web Dev", "Business", "Freelancing"].map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <select
                className="input"
                value={courseForm.level}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, level: event.target.value }))
                }
              >
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
              <input
                className="input"
                placeholder="Duration"
                value={courseForm.duration}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, duration: event.target.value }))
                }
              />
              <select
                className="input"
                value={courseForm.access}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, access: event.target.value }))
                }
              >
                <option value="free">Free access</option>
                <option value="pro">Pro access</option>
              </select>
            </div>
            <textarea
              className="input min-h-28"
              placeholder="Description"
              value={courseForm.description}
              onChange={(event) =>
                setCourseForm((prev) => ({ ...prev, description: event.target.value }))
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="input"
                placeholder="Thumbnail URL"
                value={courseForm.thumbnail}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, thumbnail: event.target.value }))
                }
              />
              <input
                className="input"
                placeholder="Provider"
                value={courseForm.provider}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, provider: event.target.value }))
                }
              />
              <input
                className="input"
                placeholder="Badge text"
                value={courseForm.badgeText}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, badgeText: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="input"
                placeholder="Tags (comma separated)"
                value={courseForm.tagsText}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, tagsText: event.target.value }))
                }
              />
              <label className="flex items-center gap-3 rounded-2xl border border-line bg-surface/60 px-4 py-3 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={courseForm.published}
                  onChange={(event) =>
                    setCourseForm((prev) => ({ ...prev, published: event.target.checked }))
                  }
                />
                Publish this course
              </label>
            </div>
            <label className="flex items-center gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={courseForm.isExternal}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, isExternal: event.target.checked }))
                }
              />
              This is an external affiliate course
            </label>
            {courseForm.isExternal ? (
              <input
                className="input"
                placeholder="External link"
                value={courseForm.externalLink}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, externalLink: event.target.value }))
                }
              />
            ) : (
              <div className="space-y-4 rounded-3xl border border-line bg-surface/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Internal lessons</div>
                  <button type="button" onClick={addLesson} className="button-secondary">
                    Add Lesson
                  </button>
                </div>
                {courseForm.lessons.map((lesson, index) => (
                  <div key={lesson.lessonId} className="grid gap-3 rounded-2xl border border-line p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs uppercase tracking-[0.2em] text-muted">
                        Lesson {index + 1}
                      </div>
                      {courseForm.lessons.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => removeLesson(index)}
                          className="text-sm text-rose-500 transition hover:opacity-80"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                    <input
                      className="input"
                      placeholder="Lesson title"
                      value={lesson.title}
                      onChange={(event) => updateLesson(index, "title", event.target.value)}
                    />
                    <textarea
                      className="input min-h-24"
                      placeholder="Lesson description"
                      value={lesson.description}
                      onChange={(event) => updateLesson(index, "description", event.target.value)}
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        className="input"
                        placeholder="YouTube embed URL"
                        value={lesson.videoUrl}
                        onChange={(event) => updateLesson(index, "videoUrl", event.target.value)}
                      />
                      <input
                        className="input"
                        placeholder="Duration"
                        value={lesson.duration}
                        onChange={(event) => updateLesson(index, "duration", event.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button type="submit" className="button-primary">
              {editingCourseId ? "Update Course" : "Save Course"}
            </button>
          </form>

          <div className="space-y-8">
            <form onSubmit={handleUpload} className="glass-card space-y-4 p-6">
              <h2 className="font-display text-3xl font-semibold">Upload asset</h2>
              <input type="file" name="file" className="input" />
              <select name="resourceType" className="input" defaultValue="auto">
                <option value="auto">Auto detect</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="raw">Raw</option>
              </select>
              <button type="submit" className="button-secondary">
                Upload to Cloudinary
              </button>
            </form>

            <form onSubmit={handleManualCertificate} className="glass-card space-y-4 p-6">
              <h2 className="font-display text-3xl font-semibold">
                Issue certificate manually
              </h2>
              <select name="userId" className="input" defaultValue="">
                <option value="" disabled>
                  Select user
                </option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} - {user.email}
                  </option>
                ))}
              </select>
              <select name="courseId" className="input" defaultValue="">
                <option value="" disabled>
                  Select course
                </option>
                {courses
                  .filter((course) => !course.isExternal)
                  .map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
              </select>
              <button type="submit" className="button-primary">
                Issue Certificate
              </button>
            </form>
          </div>
        </div>

        <section className="mt-8 glass-card p-6">
          <h2 className="font-display text-3xl font-semibold">Course inventory</h2>
          <div className="mt-6 grid gap-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className="flex flex-col gap-3 rounded-3xl border border-line bg-surface/60 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted">
                    {course.category} · {course.isExternal ? "External" : "Internal"} ·{" "}
                    {course.access === "pro" ? "Pro" : "Free"} · {course.published ? "Published" : "Draft"}
                  </div>
                  <div className="mt-2 font-display text-2xl font-semibold">{course.title}</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleEditCourse(course)}
                    className="button-secondary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCourse(course._id)}
                    className="button-secondary"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 glass-card p-6">
          <h2 className="font-display text-3xl font-semibold">Users</h2>
          <div className="mt-6 overflow-hidden rounded-3xl border border-line">
            <table className="min-w-full divide-y divide-line text-left text-sm">
              <thead className="bg-surface/70">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Courses</th>
                  <th className="px-4 py-3">Certificates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-surface/40">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">{user.plan || "free"}</td>
                    <td className="px-4 py-3">{user.enrolledCourses}</td>
                    <td className="px-4 py-3">{user.certificatesIssued}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}
