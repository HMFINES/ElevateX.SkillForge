const express = require("express");
const authRoutes = require("./authRoutes");
const courseRoutes = require("./courseRoutes");
const progressRoutes = require("./progressRoutes");
const certificateRoutes = require("./certificateRoutes");
const verifyRoutes = require("./verifyRoutes");
const adminRoutes = require("./adminRoutes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "ElevateX API",
    founder: "Harshal Wakode",
  });
});

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/progress", progressRoutes);
router.use("/certificates", certificateRoutes);
router.use("/verify", verifyRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
