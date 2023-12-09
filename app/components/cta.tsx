import Image from "next/image";

export const CTA = () => {
    return (
        <section className="w-full px-6 pt-40 mb-24 md:px-16 md:mb-36 lg:container lg:mx-auto">
            <div className="relative bg-colored-primary-reversed w-full rounded-[60px] px-6 py-9 md:p-14 md:rounded-[100px] lg:flex lg:flex-row-reverse lg:items-center lg:h-[350px] lg:rounded-[125px] lg:px-24">
                <div className="w-full aspect-video mb-9 md:max-h-72 lg:max-h-none lg:absolute lg:top-1/2 lg:right-0 lg:w-2/4 lg:-translate-y-1/2">
                    <Image
                        src="/images/cta-illustration.png"
                        alt="Saiba mais"
                        height={600}
                        width={600}
                        className="object-center object-cover absolute -top-32 left-1/2 -translate-x-1/2 md:-top-40 lg:relative lg:top-0 lg:left-0 lg:translate-x-0"
                    />
                </div>

                <div className="w-full flex flex-col">
                    <h2 className="text-white text-4xl font-bold mb-4 leading-[50px]">
                        Chat Feito para Você!
                    </h2>

                    <p className="text-white text-lg leading-8 font-medium mb-9 max-w-sm">
                        Crie seu espaço de conversação único com nossas opções de personalização.
                        Faça do chat uma extensão autêntica da sua personalidade.
                    </p>

                    <button type="button" className="bg-white px-6 py-2 w-fit rounded-[30px]">
                        <span className="text-gradient text-xl">Comece agora</span>
                    </button>
                </div>
            </div>
        </section>
    );
};
