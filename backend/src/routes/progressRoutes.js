const express = require("express");
const {
  enrollCourse,
  completeLesson,
  getMyProgress,
} = require("../controllers/progressController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);
router.get("/me", getMyProgress);
router.post("/courses/:courseId/enroll", enrollCourse);
router.post("/courses/:courseId/lessons/:lessonId/complete", completeLesson);

module.exports = router;
