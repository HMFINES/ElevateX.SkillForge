const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
    },
    planKey: {
      type: String,
      enum: ["pro-launch"],
      default: "pro-launch",
    },
    receipt: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["created", "authorized", "captured", "failed"],
      default: "created",
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    razorpayPaymentId: {
      type: String,
      default: "",
      index: true,
    },
    razorpaySignature: {
      type: String,
      default: "",
    },
    rawOrder: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    rawPayment: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ userId: 1, planKey: 1, createdAt: -1 });

module.exports = mongoose.model("Payment", paymentSchema);
