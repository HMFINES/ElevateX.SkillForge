export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const formatCategoryColor = (category) => {
  const colors = {
    AI: "from-indigo-500/20 to-sky-400/20 text-indigo-500",
    "Web Dev": "from-cyan-500/20 to-emerald-400/20 text-cyan-500",
    Business: "from-amber-500/20 to-orange-400/20 text-amber-500",
    Freelancing: "from-fuchsia-500/20 to-rose-400/20 text-fuchsia-500",
  };

  return colors[category] || "from-slate-500/20 to-slate-400/20 text-slate-500";
};
