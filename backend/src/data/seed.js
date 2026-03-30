require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Course = require("../models/Course");
const sampleCourses = require("./sampleCourses");

const seed = async () => {
  await connectDB();

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@elevatex.com").toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || "Harshal Wakode",
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || "ChangeMe123!",
      role: "admin",
      provider: "local",
      plan: "pro",
      planStatus: "active",
      billingProvider: "manual",
      proAccessGrantedAt: new Date(),
      headline: "Founder · AI Engineer & AI Automation Specialist",
    });
  } else if (existingAdmin.plan !== "pro" || existingAdmin.planStatus !== "active") {
    existingAdmin.plan = "pro";
    existingAdmin.planStatus = "active";
    existingAdmin.billingProvider = existingAdmin.billingProvider || "manual";
    existingAdmin.proAccessGrantedAt = existingAdmin.proAccessGrantedAt || new Date();
    await existingAdmin.save();
  }

  for (const course of sampleCourses) {
    const existingCourse = await Course.findOne({ title: course.title });

    if (!existingCourse) {
      await Course.create(course);
      continue;
    }

    Object.assign(existingCourse, course);
    await existingCourse.save();
  }

  console.log("Seed complete");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});
