const express = require("express");
const {
  createProOrder,
  getPaymentConfig,
  verifyProPayment,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/config", getPaymentConfig);
router.post("/orders/pro", protect, createProOrder);
router.post("/verify/pro", protect, verifyProPayment);

module.exports = router;
