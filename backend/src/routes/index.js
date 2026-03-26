const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./authRoutes");
const courseRoutes = require("./courseRoutes");
const progressRoutes = require("./progressRoutes");
const certificateRoutes = require("./certificateRoutes");
const verifyRoutes = require("./verifyRoutes");
const adminRoutes = require("./adminRoutes");
const { sendSuccess } = require("../utils/apiResponse");

const router = express.Router();

router.get("/health", (_req, res) => {
  const readyState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  sendSuccess(
    res,
    {
      service: "SkillForge API",
      founder: "Harshal Wakode",
      uptime: process.uptime(),
      database: {
        status: dbStatusMap[readyState] || "unknown",
        readyState,
      },
      timestamp: new Date().toISOString(),
    },
    "API health fetched successfully"
  );
});

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/progress", progressRoutes);
router.use("/certificates", certificateRoutes);
router.use("/verify", verifyRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
