const express = require("express");
const {
  uploadMiddleware,
  listUsers,
  listAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadAsset,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/users", listUsers);
router.get("/courses", listAdminCourses);
router.post("/courses", createCourse);
router.put("/courses/:courseId", updateCourse);
router.delete("/courses/:courseId", deleteCourse);
router.post("/uploads", uploadMiddleware, uploadAsset);

module.exports = router;
