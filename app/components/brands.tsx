"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { brandsContainerAnimation, brandsItemAnimation } from "@/constants/framer-animation/brands";

export const Brands = () => {
    return (
        <section className="w-full py-12 px-6 md:px-16 lg:container lg:mx-auto">
            <motion.ul
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={brandsContainerAnimation}
                className="flex flex-col items-center justify-center gap-9 md:justify-evenly md:flex-row md:flex-wrap"
            >
                <motion.li viewport={{ once: true }} variants={brandsItemAnimation}>
                    <Image
                        src="/images/google.svg"
                        alt="Google"
                        height={35}
                        width={110}
                        className="object-contain"
                    />
                </motion.li>

                <motion.li viewport={{ once: true }} variants={brandsItemAnimation}>
                    <Image
                        src="/images/oscar.svg"
                        alt="Oscar"
                        height={35}
                        width={112}
                        className="object-contain"
                    />
                </motion.li>

                <motion.li viewport={{ once: true }} variants={brandsItemAnimation}>
                    <Image
                        src="/images/stripe.svg"
                        alt="Stripe"
                        height={35}
                        width={83}
                        className="object-contain"
                    />
                </motion.li>

                <motion.li viewport={{ once: true }} variants={brandsItemAnimation}>
                    <Image
                        src="/images/reputation.svg"
                        alt="Reputation"
                        height={35}
                        width={190}
                        className="object-contain"
                    />
                </motion.li>

                <motion.li viewport={{ once: true }} variants={brandsItemAnimation}>
                    <Image
                        src="/images/ironclad.svg"
                        alt="Ironclad"
                        height={35}
                        width={185}
                        className="object-contain"
                    />
                </motion.li>
            </motion.ul>
        </section>
    );
};
