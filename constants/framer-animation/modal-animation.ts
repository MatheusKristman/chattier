export const containerModalAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const boxModalAnimation = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      type: "spring",
    },
  },
};
