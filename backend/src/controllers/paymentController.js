const Payment = require("../models/Payment");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { appEnv } = require("../config/env");
const {
  createOrder,
  fetchPayment,
  getPublicBillingConfig,
  verifySignature,
} = require("../services/razorpayService");

const buildReceiptId = (userId) => `pro_${String(userId)}_${Date.now()}`.slice(0, 40);

const buildUserBillingResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  bio: user.bio,
  headline: user.headline,
  provider: user.provider,
  streak: user.streak,
  xp: user.xp,
  lastActiveAt: user.lastActiveAt,
  plan: user.plan,
  planStatus: user.planStatus,
  billingProvider: user.billingProvider,
  proAccessGrantedAt: user.proAccessGrantedAt,
});

const getPaymentConfig = asyncHandler(async (_req, res) => {
  sendSuccess(res, getPublicBillingConfig(), "Payment config fetched successfully");
});

const createProOrder = asyncHandler(async (req, res) => {
  if (req.user.plan === "pro" && req.user.planStatus === "active") {
    throw new ApiError(409, "Your Pro plan is already active");
  }

  const config = getPublicBillingConfig();
  if (!config.enabled) {
    throw new ApiError(503, "Payments are not configured yet");
  }

  const receipt = buildReceiptId(req.user._id);
  const order = await createOrder({
    amount: config.plan.amount,
    currency: config.currency,
    receipt,
    notes: {
      planKey: config.plan.key,
      userId: String(req.user._id),
      email: req.user.email,
    },
  });

  await Payment.create({
    userId: req.user._id,
    provider: "razorpay",
    planKey: config.plan.key,
    receipt,
    amount: order.amount,
    currency: order.currency,
    status: order.status || "created",
    razorpayOrderId: order.id,
    rawOrder: order,
  });

  sendSuccess(
    res,
    {
      order,
      plan: config.plan,
      prefill: {
        name: req.user.name,
        email: req.user.email,
      },
    },
    "Payment order created successfully",
    201
  );
});

const verifyProPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_payment_id: paymentId,
    razorpay_order_id: razorpayOrderId,
    razorpay_signature: razorpaySignature,
  } = req.body;

  if (!paymentId || !razorpayOrderId || !razorpaySignature) {
    throw new ApiError(400, "Payment verification payload is incomplete");
  }

  const paymentRecord = await Payment.findOne({
    userId: req.user._id,
    razorpayOrderId,
  });

  if (!paymentRecord) {
    throw new ApiError(404, "Payment order not found");
  }

  const isAuthentic = verifySignature({
    orderId: paymentRecord.razorpayOrderId,
    paymentId,
    signature: razorpaySignature,
  });

  if (!isAuthentic) {
    paymentRecord.status = "failed";
    paymentRecord.razorpayPaymentId = paymentId;
    paymentRecord.razorpaySignature = razorpaySignature;
    await paymentRecord.save();
    throw new ApiError(400, "Payment signature verification failed");
  }

  const paymentDetails = await fetchPayment(paymentId);
  if (paymentDetails.order_id !== razorpayOrderId) {
    throw new ApiError(400, "Payment order mismatch");
  }

  if (
    paymentDetails.amount !== paymentRecord.amount ||
    paymentDetails.currency !== paymentRecord.currency
  ) {
    throw new ApiError(400, "Payment amount verification failed");
  }

  if (!paymentDetails.captured && paymentDetails.status !== "captured") {
    paymentRecord.status = paymentDetails.status || "authorized";
    paymentRecord.razorpayPaymentId = paymentId;
    paymentRecord.razorpaySignature = razorpaySignature;
    paymentRecord.rawPayment = paymentDetails;
    await paymentRecord.save();

    throw new ApiError(
      409,
      "Payment is authorized but not captured yet. Enable Razorpay auto-capture before going live."
    );
  }

  paymentRecord.status = "captured";
  paymentRecord.razorpayPaymentId = paymentId;
  paymentRecord.razorpaySignature = razorpaySignature;
  paymentRecord.rawPayment = paymentDetails;
  paymentRecord.paidAt = new Date();
  await paymentRecord.save();

  req.user.plan = "pro";
  req.user.planStatus = "active";
  req.user.billingProvider = "razorpay";
  req.user.proAccessGrantedAt = paymentRecord.paidAt;
  await req.user.save();

  sendSuccess(
    res,
    {
      payment: paymentRecord,
      user: buildUserBillingResponse(req.user),
      billing: {
        provider: "razorpay",
        plan: appEnv.razorpayPlanName,
      },
    },
    "Payment verified successfully"
  );
});

module.exports = {
  createProOrder,
  getPaymentConfig,
  verifyProPayment,
};
