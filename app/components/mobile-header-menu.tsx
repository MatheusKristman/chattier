"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useHeaderStore } from "@/stores/use-header-store";
import { mobileMenuAnimation } from "@/constants/framer-animation/mobile-menu-animation";

export const MobileHeaderMenu = () => {
    const { isMobileMenuOpen, closeMobileMenu } = useHeaderStore();

    return (
        <>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.nav
                        key="mobile-menu"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={mobileMenuAnimation}
                        className="absolute w-full pb-6 bg-gray-primary/50 backdrop-blur-sm top-0 left-0 rounded-bl-[30px] rounded-br-[30px] pt-4 px-6 md:px-16 md:pt-6"
                    >
                        <div className="w-full flex items-center justify-between">
                            <Link href="/" className="relative h-10 w-32">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                />
                            </Link>

                            <button
                                type="button"
                                onClick={closeMobileMenu}
                                className="relative w-10 h-10 flex items-center justify-center lg:hidden"
                            >
                                <Image
                                    src="/images/cross.svg"
                                    alt="Menu"
                                    fill
                                    className="object-contain object-center"
                                />
                            </button>
                        </div>

                        <ul className="w-full flex flex-col items-center justify-center gap-y-9 mt-12">
                            <li className="text-lg text-white font-normal">
                                <Link href="/">Início</Link>
                            </li>

                            <li className="text-lg text-white font-normal">
                                <a href="#about">Sobre</a>
                            </li>

                            <li className="w-full h-12 bg-white  flex items-center justify-center rounded-[30px]">
                                <Link href="/cadastro" className="text-gradient">
                                    Cadastre-se
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};
