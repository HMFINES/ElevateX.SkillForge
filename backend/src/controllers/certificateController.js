const Course = require("../models/Course");
const Progress = require("../models/Progress");
const Certificate = require("../models/Certificate");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { generateCertificateId } = require("../utils/certificateId");
const { generateCertificatePdf } = require("../services/certificateService");

const createCertificateRecord = async ({ user, course }) => {
  const existingCertificate = await Certificate.findOne({
    userId: user._id,
    courseId: course._id,
  }).populate("courseId");

  if (existingCertificate) {
    return existingCertificate;
  }

  const certificateId = generateCertificateId();
  const issuedDate = new Date();
  const { relativeUrl } = await generateCertificatePdf({
    certificateId,
    studentName: user.name,
    courseName: course.title,
    issueDate: issuedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  const certificate = await Certificate.create({
    userId: user._id,
    courseId: course._id,
    certificateId,
    certificateUrl: relativeUrl,
    issuedDate,
  });

  return certificate.populate("courseId");
};

const buildCompletedProgressState = (course) => {
  const completedLessons = Array.isArray(course.lessons)
    ? course.lessons.map((lesson) => lesson.lessonId)
    : [];
  const completedAt = new Date();

  return {
    completedLessons,
    progressPercent: 100,
    completed: true,
    completedAt,
    lastLessonId: completedLessons.at(-1) || "",
  };
};

const generateCertificate = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (course.isExternal) {
    throw new ApiError(400, "External courses do not issue ElevateX certificates");
  }

  const progress = await Progress.findOne({
    userId: req.user._id,
    courseId: course._id,
  });

  if (!progress || !progress.completed) {
    throw new ApiError(400, "You must complete the course before generating a certificate");
  }

  const certificate = await createCertificateRecord({
    user: req.user,
    course,
  });

  res.status(201).json({
    message: "Certificate generated successfully",
    certificate,
  });
});

const getMyCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find({ userId: req.user._id })
    .populate("courseId")
    .sort({ issuedDate: -1 });

  res.json({ certificates });
});

const getCertificateById = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({
    certificateId: req.params.certificateId,
  })
    .populate("courseId")
    .populate("userId", "name email");

  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }

  res.json({ certificate });
});

const issueManualCertificate = asyncHandler(async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    throw new ApiError(400, "userId and courseId are required");
  }

  const [user, course] = await Promise.all([
    User.findById(userId),
    Course.findById(courseId),
  ]);

  if (!user || !course) {
    throw new ApiError(404, "User or course not found");
  }

  if (course.isExternal) {
    throw new ApiError(400, "External courses do not issue ElevateX certificates");
  }

  const certificate = await createCertificateRecord({ user, course });
  const completedProgress = buildCompletedProgressState(course);

  await Progress.findOneAndUpdate(
    { userId: user._id, courseId: course._id },
    {
      userId: user._id,
      courseId: course._id,
      ...completedProgress,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    message: "Certificate issued manually",
    certificate,
  });
});

module.exports = {
  generateCertificate,
  getMyCertificates,
  getCertificateById,
  issueManualCertificate,
};
