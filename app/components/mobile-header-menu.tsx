"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { useHeaderStore } from "@/stores/use-header-store";
import { mobileMenuAnimation } from "@/constants/framer-animation/mobile-menu-animation";
import { Button } from "@/components/ui/button";

export const MobileHeaderMenu = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useHeaderStore();

  const router = useRouter();
  const { data: session } = useSession();

  function navigateToRegisterPage() {
    closeMobileMenu();
    router.push("/cadastro");
  }

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
            className="absolute w-full pb-6 bg-gray-primary/50 backdrop-blur-sm top-0 left-0 rounded-bl-[30px] rounded-br-[30px] pt-4 px-6 z-50 md:px-16 md:pt-6 lg:hidden"
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

            <ul className="w-full flex flex-col sm:flex-row items-center justify-center gap-y-9 gap-x-4 mt-12">
              {session ? (
                <>
                  <li
                    onClick={navigateToRegisterPage}
                    className="px-6 h-12 bg-white w-full flex items-center justify-center rounded-[30px] cursor-pointer hover:shadow-lg hover:shadow-[#b64862] transition-shadow"
                  >
                    <Link href="/chat" className="text-gradient">
                      Conversas
                    </Link>
                  </li>

                  <li className="text-lg text-white/70 w-full font-normal hover:text-white transition">
                    <Button
                      variant="secondary"
                      className="bg-white flex items-center px-3 h-12 w-full rounded-[30px] gap-x-2 text-base text-gray-800 font-medium"
                      onClick={() => signOut()}
                    >
                      <LogOut />
                      Sair
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-lg text-white font-normal">
                    <Link href="/">Início</Link>
                  </li>

                  <li className="text-lg text-white font-normal">
                    <a href="#about">Sobre</a>
                  </li>

                  <li
                    onClick={navigateToRegisterPage}
                    className="w-full h-12 bg-white  flex items-center justify-center rounded-[30px]"
                  >
                    <Link href="/cadastro" className="text-gradient">
                      Cadastre-se
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
