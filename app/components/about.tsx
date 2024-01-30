"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import {
  aboutTitlesContainerAnimation,
  aboutTitleAnimation,
  aboutCardAnimation,
} from "@/constants/framer-animation/about";

export const About = () => {
  return (
    <section
      id="about"
      className="w-full px-6 md:px-16 lg:container lg:mx-auto"
    >
      <AnimatePresence>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={aboutTitlesContainerAnimation}
          className="w-full flex flex-col items-center justify-center gap-y-4 mb-24"
        >
          <motion.h2
            variants={aboutTitleAnimation}
            className="text-white text-2xl text-center leading-8 font-semibold md:text-3xl md:leading-10 lg:text-4xl lg:leading-[52px] max-w-4xl"
          >
            Explore Nossas Funcionalidades Inovadoras para uma Conversa
            Inesquecível.
          </motion.h2>

          <motion.p
            variants={aboutTitleAnimation}
            className="text-white/70 text-base text-center font-medium leading-6 max-w-2xl"
          >
            Nossas ferramentas inovadoras são projetadas para enriquecer suas
            interações, tornando cada conversa memorável e significativa.
          </motion.p>
        </motion.div>

        <ul className="w-full grid grid-cols-1 grid-rows-4 gap-12 md:grid-cols-2 md:grid-rows-2">
          <motion.li
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={aboutCardAnimation}
            className="flex flex-col items-center gap-y-6 w-[300px] mx-auto"
          >
            <Image
              src="/images/acessibilidade-total.svg"
              alt="Acessibilidade Total"
              width={200}
              height={200}
              className="object-contain"
            />

            <div className="w-full flex flex-col items-center gap-y-4">
              <h3 className="text-2xl text-center text-white font-semibold ">
                Acessibilidade Total
              </h3>

              <p className="text-white/70 text-base text-center leading-6 font-normal">
                Converse a qualquer hora, em qualquer lugar, em todos os
                dispositivos.
              </p>
            </div>
          </motion.li>

          <motion.li
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={aboutCardAnimation}
            className="flex flex-col items-center gap-y-6 w-[300px] mx-auto"
          >
            <Image
              src="/images/privacidade-reforcada.svg"
              alt="Privacidade Reforçada"
              width={200}
              height={200}
              className="object-contain"
            />

            <div className="w-full flex flex-col items-center gap-y-4">
              <h3 className="text-2xl text-center text-white font-semibold ">
                Privacidade Reforçada
              </h3>

              <p className="text-white/70 text-base text-center leading-6 font-normal">
                Segurança garantida: privacidade avançada para um chat confiável
                e protegido.
              </p>
            </div>
          </motion.li>

          <motion.li
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={aboutCardAnimation}
            className="flex flex-col items-center gap-y-6 w-[300px] mx-auto"
          >
            <Image
              src="/images/colaboracao-em-tempo-real.svg"
              alt="Colaboração em Tempo Real"
              width={200}
              height={200}
              className="object-contain"
            />

            <div className="w-full flex flex-col items-center gap-y-4">
              <h3 className="text-2xl text-center text-white font-semibold ">
                Colaboração em Tempo Real
              </h3>

              <p className="text-white/70 text-base text-center leading-6 font-normal">
                Facilite colaborações com chat em tempo real para comunicação
                eficaz, independentemente da distância.
              </p>
            </div>
          </motion.li>

          <motion.li
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={aboutCardAnimation}
            className="flex flex-col items-center gap-y-6 w-[300px] mx-auto"
          >
            <Image
              src="/images/arquivamento-inteligente.svg"
              alt="Arquivamento Inteligente"
              width={200}
              height={200}
              className="object-contain"
            />

            <div className="w-full flex flex-col items-center gap-y-4">
              <h3 className="text-2xl text-center text-white font-semibold ">
                Arquivamento Inteligente
              </h3>

              <p className="text-white/70 text-base text-center leading-6 font-normal">
                Arquivamento inteligente para nunca perder informações
                essenciais em suas conversas.
              </p>
            </div>
          </motion.li>
        </ul>
      </AnimatePresence>
    </section>
  );
};
