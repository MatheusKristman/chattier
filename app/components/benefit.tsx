import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Benefit = () => {
    return (
        <section className="w-full pt-24 px-6 flex flex-col gap-y-24 md:px-16 lg:mx-auto lg:container lg:flex-row-reverse">
            <div className="relative w-full aspect-square">
                <Image
                    src="/images/benefit-illustration.png"
                    alt="Beneficio"
                    fill
                    className="object-contain object-center"
                />
            </div>

            <div className="w-full flex flex-col gap-y-5 lg:mt-32">
                <h2 className="relative text-white text-3xl font-bold leading-[42px] ml-10 before:content-[''] before:bg-benefit-blob before:bg-no-repeat before:bg-contain before:absolute before:-top-10 before:-left-10 before:w-72 before:h-56 before:-z-10 md:text-4xl md:leading-[54px] md:max-w-lg">
                    Potencialize Suas Conversas com Funcionalidades Avançadas.
                </h2>

                <Link
                    href="/cadastro"
                    className="ml-10 flex items-center gap-x-1 text-gradient-purple"
                >
                    Conheça mais
                    <MoveRight size="24" color="#F85C7F" className="mt-2" />
                </Link>
            </div>
        </section>
    );
};
