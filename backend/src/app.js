const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const apiRoutes = require("./routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const { sendSuccess } = require("./utils/apiResponse");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());
app.use(compression());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(
    process.env.NODE_ENV === "production"
      ? (tokens, req, res) =>
          JSON.stringify({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTimeMs: tokens["response-time"](req, res),
          })
      : "dev"
  )
);
app.use("/assets", express.static(path.join(__dirname, "public")));

const sendServiceStatus = (res, message = "ElevateX API is running") => {
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
      service: "ElevateX API",
      founder: "Harshal Wakode",
      uptime: process.uptime(),
      database: {
        status: dbStatusMap[readyState] || "unknown",
        readyState,
      },
      endpoints: {
        health: "/api/health",
        apiBase: "/api",
      },
      timestamp: new Date().toISOString(),
    },
    message
  );
};

app.get("/", (_req, res) => {
  sendServiceStatus(res);
});

app.get("/health", (_req, res) => {
  sendServiceStatus(res, "ElevateX root health fetched successfully");
});

app.use(["/api", "/api/v1", "/api/v2"], apiRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
