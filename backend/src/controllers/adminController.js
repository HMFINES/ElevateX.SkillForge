const multer = require("multer");
const Course = require("../models/Course");
const User = require("../models/User");
const Progress = require("../models/Progress");
const Certificate = require("../models/Certificate");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { uploadBuffer } = require("../services/cloudinaryService");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  const progress = await Progress.find();
  const certificates = await Certificate.find();

  const usersWithStats = users.map((user) => ({
    ...user.toObject(),
    enrolledCourses: progress.filter((item) => String(item.userId) === String(user._id)).length,
    certificatesIssued: certificates.filter((item) => String(item.userId) === String(user._id)).length,
  }));

  res.json({ users: usersWithStats });
});

const listAdminCourses = asyncHandler(async (_req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json({ courses });
});

const normalizeCoursePayload = (payload) => {
  const lessons = Array.isArray(payload.lessons) ? payload.lessons : [];

  return {
    title: payload.title,
    description: payload.description,
    category: payload.category,
    thumbnail: payload.thumbnail || "",
    level: payload.level || "Beginner",
    videoUrl: payload.videoUrl || "",
    isExternal: Boolean(payload.isExternal),
    externalLink: payload.externalLink || "",
    provider: payload.provider || "ElevateX",
    access: payload.access || "free",
    badgeText: payload.badgeText || (payload.isExternal ? "Get Certified" : "Internal Course"),
    duration: payload.duration || "",
    published: typeof payload.published === "boolean" ? payload.published : true,
    tags: Array.isArray(payload.tags) ? payload.tags : [],
    lessons: lessons.map((lesson, index) => ({
      lessonId: lesson.lessonId || `lesson-${index + 1}`,
      title: lesson.title,
      description: lesson.description || "",
      videoUrl: lesson.videoUrl || "",
      duration: lesson.duration || "",
      order: typeof lesson.order === "number" ? lesson.order : index + 1,
    })),
  };
};

const createCourse = asyncHandler(async (req, res) => {
  const payload = normalizeCoursePayload(req.body);

  if (!payload.title || !payload.description || !payload.category) {
    throw new ApiError(400, "title, description, and category are required");
  }

  if (!payload.isExternal && !payload.lessons.length) {
    throw new ApiError(400, "Internal courses must include at least one lesson");
  }

  if (payload.isExternal && !payload.externalLink) {
    throw new ApiError(400, "External courses must include an externalLink");
  }

  const course = await Course.create(payload);
  res.status(201).json({
    message: "Course created successfully",
    course,
  });
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const payload = normalizeCoursePayload({
    ...course.toObject(),
    ...req.body,
  });

  Object.assign(course, payload);
  await course.save();

  res.json({
    message: "Course updated successfully",
    course,
  });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  await Progress.deleteMany({ courseId: course._id });
  await Certificate.deleteMany({ courseId: course._id });
  await course.deleteOne();

  res.json({
    message: "Course deleted successfully",
  });
});

const uploadAsset = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "A file is required");
  }

  const resourceType = req.body.resourceType || "auto";
  const folder = req.body.folder || "elevatex";

  const result = await uploadBuffer(req.file.buffer, folder, resourceType);
  res.json({
    message: "File uploaded successfully",
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
  });
});

module.exports = {
  uploadMiddleware: upload.single("file"),
  listUsers,
  listAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadAsset,
};
