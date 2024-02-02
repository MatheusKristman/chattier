"use client";

import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  infoContainerAnimation,
  infoAnimation,
} from "@/constants/framer-animation/login-form";

const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório",
      invalid_type_error: "E-mail inválido",
    })
    .min(1, { message: "E-mail é obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
      invalid_type_error: "Senha inválida",
    })
    .min(1, { message: "Senha é obrigatório" }),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const session = useSession();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace(`${origin}/chat`);
    }
  }, [session.status]);

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    axios
      .post("/api/login", values)
      .then((res) => {
        signIn("credentials", { ...res.data, redirect: false })
          .then((callback) => {
            if (callback?.error) {
              toast.error(
                "Ocorreu um erro no acesso, verifique e tente novamente"
              );
            }

            if (callback?.ok) {
              router.replace(`${origin}/chat`);
            }
          })
          .catch((error) => {
            toast.error(error.response.data);
            console.error(error);
          });
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.error(error);
      });
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={infoContainerAnimation}
      className="w-full flex flex-col items-center my-auto pt-6 md:h-full md:justify-center lg:w-1/2"
    >
      <motion.div variants={infoAnimation} className="mb-12">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Chattie"
            height={41}
            width={150}
            className="object-contain object-center"
          />
        </Link>
      </motion.div>

      <motion.div
        variants={infoContainerAnimation}
        className="w-full flex flex-col items-center md:max-w-[450px]"
      >
        <motion.h1
          variants={infoAnimation}
          className="text-center text-white text-3xl font-semibold mb-6"
        >
          Entre na sua conta
        </motion.h1>

        <Form {...form}>
          <motion.form
            variants={infoAnimation}
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col mb-9"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="E-mail*"
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
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Senha*"
                      {...field}
                      className="w-full h-12 mb-4 px-6 rounded-[30px] bg-transparent outline-none transition-colors text-white font-normal text-base border-2 border-[#212A35] focus-visible:border-[#384D66]"
                    />
                  </FormControl>
                  <FormMessage className="-translate-y-3 text-red-error" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-2 bg-white rounded-[30px]"
            >
              <span className="text-gradient">Entrar</span>
            </Button>
          </motion.form>
        </Form>
      </motion.div>

      <motion.div
        variants={infoAnimation}
        className="pt-4 border-t border-[#212A35] w-full flex flex-col pb-12 md:max-w-[450px]"
      >
        <span className="text-white text-base font-normal text-center">
          Não possui uma conta?{" "}
          <Link href="/cadastro" className="underline">
            Clique aqui para criar
          </Link>
        </span>
      </motion.div>
    </motion.div>
  );
};
