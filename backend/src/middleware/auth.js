const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const extractBearerToken = (req) => {
  const authHeader = req.headers.authorization || "";
  return authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
};

const resolveUserFromToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  return user;
};

const protect = asyncHandler(async (req, _res, next) => {
  const token = extractBearerToken(req);

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  req.user = await resolveUserFromToken(token);
  next();
});

const optionalProtect = asyncHandler(async (req, _res, next) => {
  const token = extractBearerToken(req);

  if (!token) {
    next();
    return;
  }

  try {
    req.user = await resolveUserFromToken(token);
  } catch (_error) {
    req.user = undefined;
  }

  next();
});

const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new ApiError(403, "You do not have permission to perform this action"));
      return;
    }

    next();
  };

module.exports = { protect, optionalProtect, authorize };
