const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const apiRoutes = require("./routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

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

app.use(["/api", "/api/v1", "/api/v2"], apiRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
