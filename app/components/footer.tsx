"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const contactFormSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
    message: z.string().min(50, {
        message: "Mensagem precisa ter no mínimo 50 caracteres",
    }),
});

export const Footer = () => {
    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            email: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof contactFormSchema>) {
        console.log(values);
    }

    return (
        <footer className="bg-gray-secondary w-full">
            <div className="w-full px-6 pt-12 md:px-16 lg:container lg:mx-auto">
                <div className="flex flex-col gap-y-12 pb-12 lg:flex-row lg:justify-between lg:items-start">
                    <div className="flex flex-col gap-y-9">
                        <h3 className="text-white text-3xl font-semibold leading-[45px] md:max-w-[400px]">
                            Onde cada palavra conta, e cada conexão importa.
                        </h3>

                        <Image
                            src="/images/logo.svg"
                            alt="Chattie"
                            height={50}
                            width={185}
                            className="object-contain object-center"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-y-4 lg:max-w-[500px]">
                        <p className="text-white text-xl font-semibold">Ficou com alguma dúvida?</p>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full flex flex-col items-end"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    placeholder="Digite seu e-mail"
                                                    {...field}
                                                    className="w-full h-12 mb-4 px-6 rounded-[30px] bg-transparent outline-none transition-colors text-white font-normal text-base border-2 border-[#212A35] focus-visible:border-[#384D66]"
                                                />
                                            </FormControl>
                                            <FormMessage className="-translate-y-3 text-red-error" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    placeholder="Digite sua mensagem"
                                                    {...field}
                                                    className="w-full h-12 mb-6 px-6 rounded-[30px] bg-transparent outline-none transition-colors text-white font-normal text-base border-2 border-[#212A35] focus-visible:border-[#384D66]"
                                                />
                                            </FormControl>
                                            <FormMessage className="-translate-y-5 text-red-error" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="bg-colored-primary rounded-[30px] text-white font-medium text-xl h-12 md:w-fit md:px-24"
                                >
                                    Enviar
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>

                <div className="w-full border-t border-[#1B242E] py-6 flex flex-col items-center gap-6 md:flex-row md:justify-between">
                    <span className="text-white/50 text-sm">Todos os direitos reservados.</span>

                    <ul className="w-full flex items-center justify-between md:justify-end md:gap-x-12 md:w-fit">
                        <li className="text-base text-white/70 font-medium hover:text-white transition-colors">
                            <Link href="/termos-de-uso">Termos de Uso</Link>
                        </li>

                        <li className="text-base text-white/70 font-medium hover:text-white transition-colors">
                            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
