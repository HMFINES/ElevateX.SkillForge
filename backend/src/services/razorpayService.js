const crypto = require("crypto");
const ApiError = require("../utils/ApiError");
const { appEnv } = require("../config/env");

const RAZORPAY_API_BASE_URL = "https://api.razorpay.com/v1";

const isRazorpayConfigured = () =>
  Boolean(appEnv.razorpayKeyId && appEnv.razorpayKeySecret);

const assertRazorpayConfigured = () => {
  if (!isRazorpayConfigured()) {
    throw new ApiError(503, "Payments are not configured yet");
  }
};

const buildAuthHeader = () =>
  `Basic ${Buffer.from(`${appEnv.razorpayKeyId}:${appEnv.razorpayKeySecret}`).toString(
    "base64"
  )}`;

const callRazorpay = async (path, options = {}) => {
  assertRazorpayConfigured();

  const response = await fetch(`${RAZORPAY_API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: buildAuthHeader(),
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      payload.error?.description || payload.error?.reason || payload.error?.code || "Payment request failed";
    throw new ApiError(response.status, message);
  }

  return payload;
};

const createOrder = ({ amount, currency, receipt, notes }) =>
  callRazorpay("/orders", {
    method: "POST",
    body: JSON.stringify({
      amount,
      currency,
      receipt,
      notes,
    }),
  });

const fetchPayment = (paymentId) => callRazorpay(`/payments/${paymentId}`, { method: "GET" });

const verifySignature = ({ orderId, paymentId, signature }) => {
  assertRazorpayConfigured();

  if (!signature) {
    return false;
  }

  const generatedSignature = crypto
    .createHmac("sha256", appEnv.razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (generatedSignature.length !== signature.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(generatedSignature), Buffer.from(signature));
};

const getPublicBillingConfig = () => ({
  enabled: isRazorpayConfigured(),
  provider: "razorpay",
  keyId: appEnv.razorpayKeyId || "",
  currency: appEnv.razorpayCurrency,
  themeColor: appEnv.razorpayThemeColor,
  plan: {
    key: "pro-launch",
    name: appEnv.razorpayPlanName,
    amount: appEnv.razorpayProAmountPaise,
    displayAmount: appEnv.razorpayProAmountPaise / 100,
    description:
      "Unlock ElevateX Pro, premium tracks, stronger guidance, and a faster path to job-ready proof.",
  },
});

module.exports = {
  createOrder,
  fetchPayment,
  getPublicBillingConfig,
  isRazorpayConfigured,
  verifySignature,
};
