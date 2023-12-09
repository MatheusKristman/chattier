export const benefitContainerInfoAnimation = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

export const benefitInfoAnimation = {
    initial: {
        x: -50,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
};

export const benefitFrontIllustrationAnimation = {
    initial: {
        y: -50,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            delay: 0.3,
        },
    },
};

export const benefitBackIllustrationAnimation = {
    initial: {
        y: "-50%",
        x: "-50%",
        scale: 0.8,
        opacity: 0,
    },
    animate: {
        y: "-50%",
        x: "-50%",
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
};
