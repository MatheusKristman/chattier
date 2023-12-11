"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    heroMainAnimation,
    heroButtonAnimation,
    heroDescriptionAnimation,
    heroTitleAnimation,
    heroBannerAnimation,
} from "@/constants/framer-animation/hero";

export const Hero = () => {
    const router = useRouter();

    function navigateToRegisterPage() {
        router.push("/cadastro");
    }

    return (
        <motion.main
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={heroMainAnimation}
            className="w-full pt-12 px-6 relative after:content-[''] after:w-12 after:h-12 after:absolute after:top-28 after:right-2 after:bg-hero-node after:bg-no-repeat after:bg-contain after:md:top-36 after:md:right-10 md:px-16 lg:mx-auto lg:container lg:pt-36 after:lg:w-16 after:lg:h-16"
        >
            <AnimatePresence>
                <div className="w-full flex flex-col">
                    <div className="w-full flex flex-col items-center justify-center mb-4">
                        <motion.h1
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={heroTitleAnimation}
                            className="text-gradient font-bold text-5xl text-center leading-[55px] md:text-6xl md:leading-[76px] lg:text-8xl lg:leading-[110px]"
                        >
                            Converse Conecte
                        </motion.h1>

                        <motion.h1
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={heroTitleAnimation}
                            className="text-gradient-secondary font-bold text-5xl text-center leading-[55px] md:text-6xl md:leading-[76px] lg:text-8xl lg:leading-[110px]"
                        >
                            Transforme
                        </motion.h1>
                    </div>

                    <motion.p
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={heroDescriptionAnimation}
                        className="text-center text-white/70 font-normal text-base leading-7 mb-9 mx-auto md:text-lg md:leading-9 lg:max-w-3xl"
                    >
                        Desperte o potencial das conversas autênticas. Aqui, cada mensagem é uma
                        oportunidade de construir pontes e criar memórias duradouras.
                    </motion.p>

                    <motion.button
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={heroButtonAnimation}
                        type="button"
                        onClick={navigateToRegisterPage}
                        className="relative py-3 px-6 bg-colored-primary rounded-[30px] w-fit mx-auto text-white font-medium text-lg after:content-[''] after:bg-hero-highlight after:bg-no-repeat after:bg-contain after:w-10 after:h-10 after:absolute after:-top-4 after:-right-9 after:z-10 before:content-[''] before:bg-colored-primary before:blur-lg before:w-full before:h-[45px] before:absolute before:top-2 before:left-0 before:-z-10 before:opacity-50"
                    >
                        Explore Agora
                    </motion.button>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={heroBannerAnimation}
                        className="relative w-full aspect-video mt-28 before:content-[''] before:absolute before:top-0 before:left-0 before:w-24 before:h-24 before:bg-hero-banner-left-icon before:bg-no-repeat before:bg-contain before:z-10 before:-translate-y-full before:md:w-32 before:md:h-32 after:content-[''] after:absolute after:top-0 after:right-0 after:w-24 after:h-24 after:bg-hero-banner-right-icon after:bg-no-repeat after:bg-contain after:z-10 after:-translate-y-full after:md:w-32 after:md:h-32"
                    >
                        <Image
                            src="/images/hero-banner.png"
                            alt="Chattie"
                            fill
                            className="object-top object-cover"
                        />
                    </motion.div>
                </div>
            </AnimatePresence>
        </motion.main>
    );
};
