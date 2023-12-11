export const boxAnimation = {
    initial: {
        scale: 0.8,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
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
            delay: 0.3,
            type: "spring",
            stiffness: 100,
        },
    },
};

export const illustrationAnimation = {
    initial: {
        y: "-70%",
        x: "-50%",
        opacity: 0,
    },
    animate: {
        y: "-50%",
        x: "-50%",
        opacity: 1,
        transition: {
            delay: 0.6,
            type: "spring",
            stiffness: 100,
        },
    },
};
