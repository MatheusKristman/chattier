"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {
  benefitInfoAnimation,
  benefitContainerInfoAnimation,
  benefitFrontIllustrationAnimation,
  benefitBackIllustrationAnimation,
} from "@/constants/framer-animation/benefit";

export const Benefit = () => {
  return (
    <section className="w-full pt-24 px-6 flex flex-col gap-y-24 md:px-16 lg:mx-auto lg:container lg:flex-row-reverse">
      <div className="relative w-full aspect-square sm:mx-auto sm:w-fit sm:max-w-[570px] sm:min-h-[565px]">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={benefitBackIllustrationAnimation}
          className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/benefit-back-illustration.png"
            alt="Beneficio"
            width={490}
            height={570}
            className="object-contain object-center relative z-10"
            priority
          />
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={benefitFrontIllustrationAnimation}
          className="absolute -top-0 -left-0 z-20 sm:-top-16 sm:-left-10"
        >
          <Image
            src="/images/benefit-front-illustration.png"
            alt="Beneficio"
            width={570}
            height={710}
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={benefitContainerInfoAnimation}
        className="w-full flex flex-col gap-y-5 lg:mt-32"
      >
        <motion.h2
          variants={benefitInfoAnimation}
          className="relative z-30 text-white text-3xl font-bold leading-[42px] ml-10 max-w-sm before:content-[''] before:bg-benefit-blob before:bg-no-repeat before:bg-contain before:absolute before:-top-10 before:-left-10 before:w-72 before:h-56 before:-z-10 md:text-4xl md:leading-[54px] md:max-w-lg"
        >
          Potencialize Suas Conversas com Funcionalidades Avançadas.
        </motion.h2>

        <motion.div variants={benefitInfoAnimation}>
          <Link
            href="/cadastro"
            className="ml-10 flex items-center gap-x-1 text-gradient-purple"
          >
            Conheça mais
            <MoveRight size="24" color="#F85C7F" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
