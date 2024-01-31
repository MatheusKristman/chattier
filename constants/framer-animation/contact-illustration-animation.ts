export const titleAnimation = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};

export const containerAnimation = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      type: "spring",
    },
  },
};

export const backIllustrationAnimation = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};

export const frontIllustrationAnimation = {
  initial: {
    y: "-75%",
    opacity: 0,
  },
  animate: {
    y: "-50%",
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};
