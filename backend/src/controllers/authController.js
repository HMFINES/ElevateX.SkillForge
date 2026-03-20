const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { generateToken } = require("../services/tokenService");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const buildAuthResponse = (user) => ({
  token: generateToken({ userId: user._id, role: user.role }),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    bio: user.bio,
    headline: user.headline,
    provider: user.provider,
  },
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, "A user with this email already exists");
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    provider: "local",
  });

  res.status(201).json({
    message: "Account created successfully",
    ...buildAuthResponse(user),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  res.json({
    message: "Login successful",
    ...buildAuthResponse(user),
  });
});

const googleLogin = asyncHandler(async (req, res) => {
  const { credential } = req.body;

  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new ApiError(500, "Google OAuth is not configured");
  }

  if (!credential) {
    throw new ApiError(400, "Google credential is required");
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload?.email) {
    throw new ApiError(400, "Google account did not return a valid email");
  }

  let user = await User.findOne({ email: payload.email.toLowerCase() });

  if (!user) {
    user = await User.create({
      name: payload.name || payload.given_name || "Google User",
      email: payload.email.toLowerCase(),
      googleId: payload.sub,
      avatar: payload.picture || "",
      provider: "google",
    });
  } else {
    user.googleId = payload.sub;
    user.avatar = payload.picture || user.avatar;
    user.provider = "google";
    await user.save();
  }

  res.json({
    message: "Google login successful",
    ...buildAuthResponse(user),
  });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ["name", "headline", "bio", "avatar"];

  allowedFields.forEach((field) => {
    if (typeof req.body[field] !== "undefined") {
      req.user[field] = req.body[field];
    }
  });

  await req.user.save();

  res.json({
    message: "Profile updated successfully",
    user: req.user,
  });
});

module.exports = {
  register,
  login,
  googleLogin,
  getMe,
  updateProfile,
};
