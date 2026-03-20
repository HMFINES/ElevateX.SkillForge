const express = require("express");
const {
  generateCertificate,
  getMyCertificates,
  getCertificateById,
  issueManualCertificate,
} = require("../controllers/certificateController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/:certificateId", getCertificateById);
router.use(protect);
router.get("/", getMyCertificates);
router.post("/courses/:courseId/generate", generateCertificate);
router.post("/manual/issue", authorize("admin"), issueManualCertificate);

module.exports = router;
