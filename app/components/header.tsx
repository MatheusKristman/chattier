"use client";

import Image from "next/image";
import Link from "next/link";

import { useHeaderStore } from "@/stores/use-header-store";

export const Header = () => {
    const { openMobileMenu } = useHeaderStore();

    return (
        <header className="w-full pt-4 px-6 flex items-center justify-between md:px-16 md:pt-6 lg:container lg:mx-auto">
            <Link href="/" className="relative h-10 w-32">
                <Image src="/images/logo.svg" alt="Logo" fill className="object-contain" />
            </Link>

            <button
                type="button"
                onClick={openMobileMenu}
                className="relative w-10 h-10 flex items-center justify-center lg:hidden"
            >
                <Image
                    src="/images/hamburger.svg"
                    alt="Menu"
                    fill
                    className="object-contain object-center"
                />
            </button>

            <ul className="hidden items-center justify-end gap-x-12 lg:flex">
                <li className="text-lg text-white/70 font-normal hover:text-white transition">
                    <Link href="/">Início</Link>
                </li>

                <li className="text-lg text-white/70 font-normal hover:text-white transition">
                    <a href="#about">Sobre</a>
                </li>

                <li className="px-6 h-12 bg-white  flex items-center justify-center rounded-[30px] cursor-pointer hover:shadow-lg hover:shadow-[#b64862] transition-shadow">
                    <Link href="/cadastro" className="text-gradient">
                        Cadastre-se
                    </Link>
                </li>
            </ul>
        </header>
    );
};
