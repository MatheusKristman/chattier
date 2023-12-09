"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import {
    ctaContainerInfoAnimation,
    ctaInfoAnimation,
    ctaIllustrationAnimation,
} from "@/constants/framer-animation/cta";

export const CTA = () => {
    return (
        <section className="w-full px-6 pt-40 mb-24 md:px-16 md:mb-36 lg:container lg:mx-auto">
            <div className="relative bg-colored-primary-reversed w-full rounded-[60px] px-6 py-9 md:p-14 md:rounded-[100px] lg:flex lg:flex-row-reverse lg:items-center lg:h-[350px] lg:rounded-[125px] lg:px-24">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={ctaIllustrationAnimation}
                    className="relative w-full aspect-video mb-9 md:aspect-square md:max-h-72 lg:max-h-none lg:w-1/2 lg:mb-0 lg:absolute lg:right-0"
                >
                    <Image
                        src="/images/cta-illustration.png"
                        alt="Saiba mais"
                        height={600}
                        width={600}
                        className="object-center object-cover absolute -bottom-7 left-1/2 -translate-x-1/2 md:-bottom-16 lg:relative lg:top-0 lg:left-0 lg:translate-x-0"
                    />
                </motion.div>

                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={ctaContainerInfoAnimation}
                    className="w-full flex flex-col -mt-0 md:-mt-0 lg:mt-0 lg:min-w-[403px]"
                >
                    <motion.h2
                        variants={ctaInfoAnimation}
                        className="text-white text-4xl font-bold mb-4 leading-[50px]"
                    >
                        Chat Feito para Você!
                    </motion.h2>

                    <motion.p
                        variants={ctaInfoAnimation}
                        className="text-white text-lg leading-8 font-medium mb-9 max-w-sm"
                    >
                        Crie seu espaço de conversação único com nossas opções de personalização.
                        Faça do chat uma extensão autêntica da sua personalidade.
                    </motion.p>

                    <motion.button
                        variants={ctaInfoAnimation}
                        type="button"
                        className="bg-white px-6 py-2 w-fit rounded-[30px]"
                    >
                        <span className="text-gradient text-xl">Comece agora</span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};
