const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v2";

const PUBLIC_BASE_URL = (() => {
  try {
    const url = new URL(API_BASE_URL);
    const normalizedPath = url.pathname.replace(/\/$/, "");
    return normalizedPath.endsWith("/api")
      ? `${url.origin}${normalizedPath.slice(0, -4)}`
      : url.origin;
  } catch (_error) {
    return API_BASE_URL.replace(/\/api\/?$/, "");
  }
})();

const getAssetUrl = (assetPath = "") => {
  if (!assetPath) {
    return "";
  }

  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }

  return `${PUBLIC_BASE_URL}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
};

const normalizeResponse = (payload = {}) => {
  if (payload && typeof payload === "object" && "success" in payload) {
    if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
      return {
        ...payload.data,
        message: payload.message,
        success: payload.success,
        error: payload.error,
      };
    }

    return {
      data: payload.data,
      message: payload.message,
      success: payload.success,
      error: payload.error,
    };
  }

  return payload;
};

const request = async (endpoint, options = {}) => {
  const { token, method = "GET", body, headers = {} } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error?.message || "Request failed");
  }

  return normalizeResponse(data);
};

export const api = {
  baseUrl: API_BASE_URL,
  assetUrl: getAssetUrl,
  request,
  getHealth: () => request("/health"),
  getCourses: (query = "") => request(`/courses${query}`),
  getFeaturedCourses: () => request("/courses/featured"),
  getCourse: (slug, token) => request(`/courses/${slug}`, { token }),
  signup: (payload) => request("/auth/signup", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  googleLogin: (credential) =>
    request("/auth/google", {
      method: "POST",
      body: { credential },
    }),
  getMe: (token) => request("/auth/me", { token }),
  updateProfile: (token, body) =>
    request("/auth/me", { method: "PATCH", token, body }),
  getDashboard: (token) => request("/progress/me", { token }),
  enrollCourse: (courseId, token) =>
    request(`/progress/courses/${courseId}/enroll`, {
      method: "POST",
      token,
    }),
  completeLesson: (courseId, lessonId, token) =>
    request(`/progress/courses/${courseId}/lessons/${lessonId}/complete`, {
      method: "POST",
      token,
    }),
  generateCertificate: (courseId, token) =>
    request(`/certificates/courses/${courseId}/generate`, {
      method: "POST",
      token,
    }),
  getCertificates: (token) => request("/certificates", { token }),
  getCertificate: (certificateId) => request(`/certificates/${certificateId}`),
  verifyCertificate: (certificateId) => request(`/verify/${certificateId}`),
  adminUsers: (token) => request("/admin/users", { token }),
  adminCourses: (token) => request("/admin/courses", { token }),
  adminCreateCourse: (token, body) =>
    request("/admin/courses", { method: "POST", token, body }),
  adminUpdateCourse: (token, courseId, body) =>
    request(`/admin/courses/${courseId}`, { method: "PUT", token, body }),
  adminDeleteCourse: (token, courseId) =>
    request(`/admin/courses/${courseId}`, { method: "DELETE", token }),
  adminIssueCertificate: (token, body) =>
    request("/certificates/manual/issue", { method: "POST", token, body }),
};
