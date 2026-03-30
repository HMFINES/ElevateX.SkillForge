const logger = require("../utils/logger");

const DEFAULT_DEV_JWT_SECRET =
  "e2936e4a39f77c7af2f7eb00cb068f06efb36f1cc63c207382b89b8be6445c06";

const readEnv = (name, fallback = "") => {
  const value = process.env[name];

  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed || fallback;
};

const appEnv = {
  nodeEnv: readEnv("NODE_ENV", "development"),
  mongoUri: readEnv("MONGODB_URI"),
  clientUrl: readEnv("CLIENT_URL", "http://localhost:3000"),
  jwtSecret: readEnv("JWT_SECRET"),
  googleClientId: readEnv("GOOGLE_CLIENT_ID"),
  razorpayKeyId: readEnv("RAZORPAY_KEY_ID"),
  razorpayKeySecret: readEnv("RAZORPAY_KEY_SECRET"),
  razorpayCurrency: readEnv("RAZORPAY_CURRENCY", "INR"),
  razorpayPlanName: readEnv("RAZORPAY_PLAN_NAME", "Pro Launch"),
  razorpayThemeColor: readEnv("RAZORPAY_THEME_COLOR", "#5169ff"),
  razorpayProAmountPaise: Number(readEnv("RAZORPAY_PRO_AMOUNT_PAISE", "99900")),
};

const validateServerEnv = () => {
  if (!appEnv.mongoUri) {
    throw new Error("MONGODB_URI is required");
  }

  if (!appEnv.jwtSecret) {
    throw new Error("JWT_SECRET is required");
  }

  if (appEnv.nodeEnv === "production") {
    if (!appEnv.clientUrl) {
      throw new Error("CLIENT_URL is required in production");
    }

    if (appEnv.jwtSecret === DEFAULT_DEV_JWT_SECRET) {
      throw new Error("JWT_SECRET must not use the development default in production");
    }
  }

  if (Number.isNaN(appEnv.razorpayProAmountPaise) || appEnv.razorpayProAmountPaise < 1000) {
    throw new Error("RAZORPAY_PRO_AMOUNT_PAISE must be a valid amount in currency subunits");
  }

  const hasPartialRazorpayConfig =
    (appEnv.razorpayKeyId && !appEnv.razorpayKeySecret) ||
    (!appEnv.razorpayKeyId && appEnv.razorpayKeySecret);

  if (hasPartialRazorpayConfig) {
    throw new Error("Configure both RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET together");
  }

  if (!appEnv.googleClientId) {
    logger.warn("Google OAuth is disabled because GOOGLE_CLIENT_ID is not configured");
  }

  if (!appEnv.razorpayKeyId || !appEnv.razorpayKeySecret) {
    logger.warn("Razorpay billing is disabled because API keys are not configured");
  }
};

module.exports = {
  appEnv,
  validateServerEnv,
};
