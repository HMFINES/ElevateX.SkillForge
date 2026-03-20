const Course = require("../models/Course");
const Progress = require("../models/Progress");
const Certificate = require("../models/Certificate");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const computeProgress = (course, completedLessons) => {
  const lessonCount = course.lessons.length;
  if (!lessonCount) {
    return {
      completedLessons: [],
      progressPercent: 100,
      completed: true,
      completedAt: new Date(),
    };
  }

  const uniqueCompleted = [...new Set(completedLessons)];
  const progressPercent = Math.min(
    100,
    Math.round((uniqueCompleted.length / lessonCount) * 100)
  );

  return {
    completedLessons: uniqueCompleted,
    progressPercent,
    completed: uniqueCompleted.length >= lessonCount,
    completedAt: uniqueCompleted.length >= lessonCount ? new Date() : null,
  };
};

const enrollCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  let progress = await Progress.findOne({
    userId: req.user._id,
    courseId: course._id,
  });

  if (!progress) {
    progress = await Progress.create({
      userId: req.user._id,
      courseId: course._id,
      completed: course.isExternal,
      progressPercent: course.isExternal ? 100 : 0,
      completedAt: course.isExternal ? new Date() : null,
    });
  }

  res.json({
    message: "Course enrolled successfully",
    progress,
  });
});

const completeLesson = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (course.isExternal) {
    throw new ApiError(400, "External courses do not support lesson completion tracking");
  }

  const lessonExists = course.lessons.some((lesson) => lesson.lessonId === req.params.lessonId);
  if (!lessonExists) {
    throw new ApiError(404, "Lesson not found");
  }

  let progress = await Progress.findOne({
    userId: req.user._id,
    courseId: course._id,
  });

  if (!progress) {
    progress = new Progress({
      userId: req.user._id,
      courseId: course._id,
      completedLessons: [],
    });
  }

  const completedLessons = [...progress.completedLessons, req.params.lessonId];
  const nextState = computeProgress(course, completedLessons);

  progress.completedLessons = nextState.completedLessons;
  progress.progressPercent = nextState.progressPercent;
  progress.completed = nextState.completed;
  progress.lastLessonId = req.params.lessonId;
  progress.completedAt = nextState.completedAt;

  await progress.save();

  res.json({
    message: "Lesson marked as complete",
    progress,
  });
});

const getMyProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.find({ userId: req.user._id })
    .populate("courseId")
    .sort({ updatedAt: -1 });

  const certificates = await Certificate.find({ userId: req.user._id })
    .populate("courseId")
    .sort({ issuedDate: -1 });

  res.json({
    progress,
    certificates,
  });
});

module.exports = {
  enrollCourse,
  completeLesson,
  getMyProgress,
};
