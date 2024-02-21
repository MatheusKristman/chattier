"use client";

import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
} from "@/constants/framer-animation/register-form";
import { cn } from "@/lib/utils";

const registerFormSchema = z
  .object({
    firstName: z.string().min(1, { message: "Nome é obrigatório" }),
    lastName: z.string().min(1, { message: "Sobrenome é obrigatório" }),
    nickname: z.string().optional(),
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
      .min(8, { message: "Senha precisa ter no mínimo 8 caracteres" }),
    passwordConfirm: z
      .string({
        required_error: "Confirmação da Senha é obrigatória",
        invalid_type_error: "Confirmação da Senha inválida",
      })
      .min(8, {
        message: "Confirmação de senha precisa ter no mínimo 8 caracteres",
      }),
    isCheckboxConfirmed: z.boolean({
      required_error: "Marque a caixa acima para prosseguir",
      invalid_type_error: "Confirmação inválida",
    }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
      });
    }
  });

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isCheckboxConfirmed: false,
    },
  });
  const session = useSession();
  const router = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace(`${origin}/chat`);
    }
  }, [session.status, origin, router]);

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    if (!values.isCheckboxConfirmed) {
      toast.error("Marque a caixa para prosseguir", {
        position: "bottom-right",
      });
    }

    setIsSubmitting(true);

    axios
      .post("/api/register", values)
      .then((res) => {
        if (!res.data.email) {
          toast.error(
            "Ocorreu um erro no cadastro, verifique e tente novamente",
          );
        }

        signIn("credentials", {
          ...res.data,
          redirect: false,
        })
          .then((callback) => {
            if (callback?.error) {
              toast.error(
                "Ocorreu um erro durante o cadastro, verifique e tente novamente",
              );
            }

            if (callback?.ok) {
              router.replace(`${origin}/chat`);
            }
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.error(error);
        setIsSubmitting(false);
      });
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={infoContainerAnimation}
      className="w-full my-auto flex flex-col items-center pt-6 md:h-full md:justify-center lg:w-1/2"
    >
      <motion.div variants={infoAnimation} className="mb-12">
        <Link href="/" className={cn({ "pointer-events-none": isSubmitting })}>
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
          Crie sua conta
        </motion.h1>

        <Form {...form}>
          <motion.form
            variants={infoAnimation}
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col mb-9"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Nome*"
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
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Sobrenome*"
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
              name="nickname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Apelido"
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="password"
                      placeholder="Confirmar senha*"
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
              name="isCheckboxConfirmed"
              render={({ field }) => (
                <FormItem className="w-full mt-4 mb-6">
                  <FormControl>
                    <Checkbox
                      disabled={isSubmitting}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="ml-2 text-white text-base font-normal">
                    Ao se cadastrar, você concorda com nossos{" "}
                    <Link
                      href="/termos-de-servico"
                      className={cn("underline", {
                        "pointer-events-none": isSubmitting,
                      })}
                    >
                      Termos de Serviço
                    </Link>{" "}
                    e{" "}
                    <Link
                      href="/politica-de-privacidade"
                      className={cn("underline", {
                        "pointer-events-none": isSubmitting,
                      })}
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </FormLabel>

                  <FormMessage className="-translate-y-3 text-red-error">
                    {form.formState.errors.isCheckboxConfirmed?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* TODO: arrumar hover do botão */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-2 bg-white rounded-[30px] disabled:brightness-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="text-gradient">Cadastrando</span>
              ) : (
                <span className="text-gradient">Cadastrar</span>
              )}
            </Button>
          </motion.form>
        </Form>
      </motion.div>

      <motion.div
        variants={infoAnimation}
        className="pt-4 border-t border-[#212A35] w-full flex flex-col pb-12 md:max-w-[450px]"
      >
        <span className="text-white text-base font-normal text-center">
          Já possui uma conta?{" "}
          <Link
            href="/login"
            className={cn("underline", { "pointer-events-none": isSubmitting })}
          >
            Clique aqui para entrar
          </Link>
        </span>
      </motion.div>
    </motion.div>
  );
};
