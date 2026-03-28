const mongoose = require("mongoose");
const logger = require("../utils/logger");

let listenersRegistered = false;

const parseEnvNumber = (
  name,
  fallback,
  { integer = false, minimum = Number.NEGATIVE_INFINITY } = {}
) => {
  const rawValue = process.env[name];

  if (rawValue == null || rawValue.trim() === "") {
    return fallback;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isFinite(parsedValue)) {
    logger.warn("Invalid numeric environment variable, using fallback", {
      name,
      value: rawValue,
      fallback,
    });
    return fallback;
  }

  if (integer && !Number.isInteger(parsedValue)) {
    logger.warn("Non-integer environment variable, using fallback", {
      name,
      value: rawValue,
      fallback,
    });
    return fallback;
  }

  if (parsedValue < minimum) {
    logger.warn("Out-of-range environment variable, using fallback", {
      name,
      value: rawValue,
      minimum,
      fallback,
    });
    return fallback;
  }

  return parsedValue;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const registerConnectionListeners = () => {
  if (listenersRegistered) {
    return;
  }

  listenersRegistered = true;

  mongoose.connection.on("connected", () => {
    logger.info("MongoDB connection established", {
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    });
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB connection disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("MongoDB connection re-established");
  });

  mongoose.connection.on("error", (error) => {
    logger.error("MongoDB connection error", {
      message: error.message,
      name: error.name,
    });
  });
};

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  const maxRetries = parseEnvNumber("DB_CONNECT_RETRIES", 5, {
    integer: true,
    minimum: 1,
  });
  const retryDelayMs = parseEnvNumber("DB_CONNECT_RETRY_DELAY_MS", 5000, {
    integer: true,
    minimum: 0,
  });
  const serverSelectionTimeoutMs = parseEnvNumber(
    "DB_SERVER_SELECTION_TIMEOUT_MS",
    10000,
    {
      integer: true,
      minimum: 1,
    }
  );

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  registerConnectionListeners();

  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      logger.info("Connecting to MongoDB", {
        attempt,
        maxRetries,
      });

      await mongoose.connect(mongoUri, {
        autoIndex: process.env.NODE_ENV !== "production",
        maxPoolSize: 10,
        serverSelectionTimeoutMS: serverSelectionTimeoutMs,
      });

      return mongoose.connection;
    } catch (error) {
      lastError = error;

      logger.error("MongoDB connection attempt failed", {
        attempt,
        maxRetries,
        message: error.message,
        name: error.name,
      });

      if (attempt < maxRetries) {
        logger.warn("Retrying MongoDB connection", {
          retryInMs: retryDelayMs,
        });
        await sleep(retryDelayMs);
      }
    }
  }

  throw lastError;
};

module.exports = connectDB;
