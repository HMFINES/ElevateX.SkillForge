const express = require("express");
const {
  listCourses,
  getFeaturedCourses,
  getCourseBySlug,
} = require("../controllers/courseController");
const { optionalProtect } = require("../middleware/auth");

const router = express.Router();

router.get("/", listCourses);
router.get("/featured", getFeaturedCourses);
router.get("/:slug", optionalProtect, getCourseBySlug);

module.exports = router;
