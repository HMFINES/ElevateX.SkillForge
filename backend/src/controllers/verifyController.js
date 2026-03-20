const Certificate = require("../models/Certificate");
const asyncHandler = require("../utils/asyncHandler");

const verifyCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({
    certificateId: req.params.certificateId,
  })
    .populate("courseId", "title")
    .populate("userId", "name");

  if (!certificate) {
    res.status(404).json({
      valid: false,
      message: "Certificate not found",
    });
    return;
  }

  res.json({
    valid: true,
    certificateId: certificate.certificateId,
    studentName: certificate.userId.name,
    courseName: certificate.courseId.title,
    issueDate: certificate.issuedDate,
    certificateUrl: certificate.certificateUrl,
  });
});

module.exports = { verifyCertificate };
