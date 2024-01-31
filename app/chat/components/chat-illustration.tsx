import Image from "next/image";
import { motion } from "framer-motion";

import {
  titleAnimation,
  containerAnimation,
  frontIllustrationAnimation,
  backIllustrationAnimation,
} from "@/constants/framer-animation/contact-illustration-animation";

export const ChatIllustration = () => {
  return (
    <div className="hidden lg:flex lg:w-full lg:min-h-screen lg:overflow-auto py-12">
      <div className="flex flex-col items-center gap-y-20 my-auto mx-auto">
        <motion.h2
          initial="initial"
          animate="animate"
          variants={titleAnimation}
          className="text-white text-3xl font-semibold text-center max-w-lg leading-[42px]"
        >
          Para iniciar uma conversa, clique no botão &apos;Iniciar nova
          conversa&apos; ou na conversa ao lado.
        </motion.h2>

        <motion.div
          initial="initial"
          animate="animate"
          variants={containerAnimation}
          className="w-[680px] h-[420px] rounded-[70px] bg-gradient-to-tr from-[#9DFACE] to-[#F85C7F] flex items-center justify-center relative"
        >
          <motion.div variants={backIllustrationAnimation}>
            <Image
              src="/images/chat-tip-back-illustration.png"
              alt="Inicie uma conversa"
              width={380}
              height={380}
              className="object-center"
            />
          </motion.div>

          <motion.div
            variants={frontIllustrationAnimation}
            className="absolute top-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/chat-tip-front-illustration.png"
              alt="Inicie uma conversa"
              width={710}
              height={500}
              className="object-center"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
