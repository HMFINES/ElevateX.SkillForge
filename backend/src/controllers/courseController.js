const Course = require("../models/Course");
const Progress = require("../models/Progress");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const listCourses = asyncHandler(async (req, res) => {
  const { category, type, search } = req.query;
  const filter = { published: true };

  if (category) {
    filter.category = category;
  }

  if (type === "internal") {
    filter.isExternal = false;
  }

  if (type === "external") {
    filter.isExternal = true;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const courses = await Course.find(filter).sort({ createdAt: -1 });
  res.json({ courses });
});

const getFeaturedCourses = asyncHandler(async (_req, res) => {
  const courses = await Course.find({ published: true }).limit(4).sort({ createdAt: -1 });
  res.json({ courses });
});

const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, published: true });
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  let progress = null;
  if (req.user) {
    progress = await Progress.findOne({
      userId: req.user._id,
      courseId: course._id,
    });
  }

  res.json({ course, progress });
});

module.exports = {
  listCourses,
  getFeaturedCourses,
  getCourseBySlug,
};
