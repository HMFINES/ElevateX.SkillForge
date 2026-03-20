const mongoose = require("mongoose");
const slugify = require("slugify");

const buildDerivedCourseFields = (payload = {}) => {
  const nextPayload = { ...payload };

  if (nextPayload.title) {
    nextPayload.slug = slugify(nextPayload.title, { lower: true, strict: true });
  }

  if (
    nextPayload.isExternal === false &&
    Array.isArray(nextPayload.lessons) &&
    nextPayload.lessons.length &&
    !nextPayload.videoUrl
  ) {
    nextPayload.videoUrl = nextPayload.lessons[0].videoUrl || "";
  }

  return nextPayload;
};

const lessonSchema = new mongoose.Schema(
  {
    lessonId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["AI", "Web Dev", "Business", "Freelancing"],
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    tags: {
      type: [String],
      default: [],
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
    externalLink: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      default: "ElevateX",
    },
    badgeText: {
      type: String,
      default: "",
    },
    lessons: {
      type: [lessonSchema],
      default: [],
    },
    duration: {
      type: String,
      default: "",
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("validate", function applyCourseDerivatives(next) {
  const derivedFields = buildDerivedCourseFields({
    title: this.title,
    isExternal: this.isExternal,
    lessons: this.lessons,
    videoUrl: this.videoUrl,
  });

  this.slug = derivedFields.slug;
  this.videoUrl = derivedFields.videoUrl || this.videoUrl;

  next();
});

courseSchema.pre("findOneAndUpdate", function applyQueryDerivatives(next) {
  const update = this.getUpdate() || {};
  const directUpdate = { ...update };
  delete directUpdate.$set;

  const currentSet = update.$set || {};
  const target = update.$set ? { ...currentSet } : directUpdate;
  const derivedFields = buildDerivedCourseFields(target);

  if (update.$set) {
    this.setUpdate({
      ...update,
      $set: {
        ...currentSet,
        ...derivedFields,
      },
    });
  } else {
    this.setUpdate({
      ...update,
      ...derivedFields,
    });
  }

  next();
});

module.exports = mongoose.model("Course", courseSchema);
