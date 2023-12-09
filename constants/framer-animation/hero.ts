export const heroMainAnimation = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const heroTitleAnimation = {
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
            delay: 0.2,
        },
    },
};

export const heroDescriptionAnimation = {
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
            delay: 0.4,
        },
    },
};

export const heroButtonAnimation = {
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
            delay: 0.6,
        },
    },
};

export const heroBannerAnimation = {
    initial: {
        y: 100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            delay: 0.2,
        },
    },
};
