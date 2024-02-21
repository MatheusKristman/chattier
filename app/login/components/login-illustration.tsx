"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  boxAnimation,
  backIllustrationAnimation,
  illustrationAnimation,
} from "@/constants/framer-animation/login-illustration";

export const LoginIllustration = () => {
  return (
    <div className="hidden lg:flex w-1/2 h-full p-6">
      <motion.div
        initial="initial"
        animate="animate"
        variants={boxAnimation}
        className="p-24 relative w-full h-full bg-gradient-to-br from-[#523BFE] to-[#9DFACE] rounded-[90px] flex items-center justify-center"
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={backIllustrationAnimation}
          className="relative w-full h-full max-w-[500px] max-h-[500px]"
        >
          <Image
            src="/images/login-behind-illustration.png"
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
            src="/images/login-front-illustration.png"
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
