export const transition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition,
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};
