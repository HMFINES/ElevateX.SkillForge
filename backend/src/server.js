require("dotenv").config();
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const app = require("./app");
const logger = require("./utils/logger");
const { validateServerEnv } = require("./config/env");

const port = process.env.PORT || 5000;
let server;
let isShuttingDown = false;

const startServer = async () => {
  validateServerEnv();
  await connectDB();

  server = app.listen(port, () => {
    logger.info("ElevateX API server started", {
      port,
      env: process.env.NODE_ENV || "development",
    });
  });
};

const shutdown = async (signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  logger.warn("Shutdown signal received", { signal });

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    }

    await mongoose.connection.close();
    logger.info("Server shutdown completed");
    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown", {
      message: error.message,
      name: error.name,
    });
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});

process.on("unhandledRejection", (error) => {
  logger.error("Unhandled promise rejection", {
    message: error.message,
    stack: error.stack,
  });
  shutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception", {
    message: error.message,
    stack: error.stack,
  });
  shutdown("uncaughtException");
});

startServer().catch((error) => {
  logger.error("Failed to start server", {
    message: error.message,
    name: error.name,
    stack: error.stack,
  });
  process.exit(1);
});
