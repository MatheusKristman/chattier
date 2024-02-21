"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  boxAnimation,
  backIllustrationAnimation,
  illustrationAnimation,
} from "@/constants/framer-animation/register-illustration";

export const RegisterIllustration = () => {
  return (
    <div className="hidden lg:flex w-1/2 h-full p-6">
      <motion.div
        initial="initial"
        animate="animate"
        variants={boxAnimation}
        className="p-24 relative w-full h-full bg-gradient-to-bl from-[#F85C7F] to-[#6E80F7] rounded-[90px] flex items-center justify-center"
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={backIllustrationAnimation}
          className="relative w-full h-full max-w-[500px] max-h-[500px]"
        >
          <Image
            src="/images/register-behind-illustration.png"
            alt="Cadastro"
            fill
            className="object-contain object-center"
            priority
          />
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={illustrationAnimation}
          className="w-3/4 h-3/4 max-w-[500px] max-h-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/register-front-illustration.png"
            alt="Cadastro"
            fill
            className="object-contain object-center"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
