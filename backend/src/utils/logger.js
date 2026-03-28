const isProduction = process.env.NODE_ENV === "production";

const getWriter = (level) => {
  if (level === "error") {
    return console.error;
  }

  if (level === "warn") {
    return console.warn;
  }

  return console.log;
};

const formatMeta = (meta = {}) => {
  if (!meta || Object.keys(meta).length === 0) {
    return "";
  }

  try {
    return ` ${JSON.stringify(meta)}`;
  } catch (_error) {
    return " [unserializable-meta]";
  }
};

const log = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const writer = getWriter(level);

  if (isProduction) {
    const payload = {
      level,
      message,
      timestamp,
      ...meta,
    };

    writer(JSON.stringify(payload));
    return;
  }

  writer(`[${timestamp}] ${level.toUpperCase()} ${message}${formatMeta(meta)}`);
};

module.exports = {
  info: (message, meta) => log("info", message, meta),
  warn: (message, meta) => log("warn", message, meta),
  error: (message, meta) => log("error", message, meta),
};
