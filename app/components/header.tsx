"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import { useHeaderStore } from "@/stores/use-header-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { openMobileMenu } = useHeaderStore();
  const router = useRouter();
  const { data: session } = useSession();

  function navigateToRegisterPage() {
    router.push("/cadastro");
  }

  console.log(session);

  return (
    <header className="w-full pt-4 px-6 flex items-center justify-between md:px-16 md:pt-6 lg:container lg:mx-auto">
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

      <ul
        className={cn(
          "hidden items-center justify-end lg:flex",
          session ? "gap-x-6" : "gap-x-12"
        )}
      >
        {session ? (
          <>
            <li className="text-lg text-white/70 font-normal hover:text-white transition">
              <Button
                variant="ghost"
                className="px-3 h-12 rounded-[30px]"
                onClick={() => signOut()}
              >
                <LogOut />
              </Button>
            </li>

            <li
              onClick={navigateToRegisterPage}
              className="px-6 h-12 bg-white  flex items-center justify-center rounded-[30px] cursor-pointer hover:shadow-lg hover:shadow-[#b64862] transition-shadow"
            >
              <Link href="/chat" className="text-gradient">
                Conversas
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-lg text-white/70 font-normal hover:text-white transition">
              <Link href="/">Início</Link>
            </li>

            <li className="text-lg text-white/70 font-normal hover:text-white transition">
              <a href="#about">Sobre</a>
            </li>

            <li
              onClick={navigateToRegisterPage}
              className="px-6 h-12 bg-white  flex items-center justify-center rounded-[30px] cursor-pointer hover:shadow-lg hover:shadow-[#b64862] transition-shadow"
            >
              <Link href="/cadastro" className="text-gradient">
                Cadastre-se
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};
