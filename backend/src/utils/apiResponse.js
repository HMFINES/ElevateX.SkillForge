const buildSuccess = (data = {}, message = "OK") => ({
  success: true,
  data,
  message,
  error: null,
});

const buildError = (message = "Something went wrong", error = null) => ({
  success: false,
  data: null,
  message,
  error,
});

const sendSuccess = (res, data = {}, message = "OK", status = 200) =>
  res.status(status).json(buildSuccess(data, message));

module.exports = {
  buildSuccess,
  buildError,
  sendSuccess,
};
