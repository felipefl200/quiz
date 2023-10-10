"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizCreationSchema } from "@/app/schemas/quizCreationSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { urlApi } from "@/utils/UrlApi";
import { useState } from "react";

type Input = z.infer<typeof quizCreationSchema>;

export function QuizCreation() {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const toast = useToast();
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const response = await fetch(`${urlApi()}/game`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ amount, topic, type }),
      }).then((r) => r.json());
      return response;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: "mcq",
    },
  });

  const onSubmit = (data: Input) => {
    getQuestions(data, {
      onSuccess: ({ gameId }: { gameId: string }) => {
        if (!gameId) {
          toast.toast({
            title: "Erro",
            description: "Algo deu errado. Por favor, tente novamente mais tarde.",
            variant: "destructive",
          });
          return;
        }

        if (form.getValues("type") === "open_ended") {
          router.push(`/play/open-ended/${gameId}`);
        } else {
          router.push(`/play/mcq/${gameId}`);
        }
      },
      onError: (error) => {
        setShowLoader(false);
        if (error instanceof Error) {
          console.log(error.message);
          toast.toast({
            title: "Erro",
            description: "Algo deu errado. Por favor, tente novamente mais tarde.",
            variant: "destructive",
          });
        }
      },
    });
  };

  form.watch();
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle>Vamos criar o quiz</CardTitle>
          <CardDescription>Selecione o tópico</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tópico</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite um tópico" {...field} />
                    </FormControl>
                    <FormDescription>Informe o tópico do quiz.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        min={1}
                        max={10}
                        type="number"
                        onChange={(e) => {
                          form.setValue("amount", parseInt(e.target.value));
                        }}
                        placeholder="Informe a quantidade de questões"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  onClick={() => form.setValue("type", "mcq")}
                  variant={
                    form.getValues("type") === "mcq" ? "secondary" : "ghost"
                  }
                  type="button"
                  className="w-1/2 rounded-none rounded-l-lg"
                >
                  <CopyCheck className="w-4 h-4 mr-2" />
                  <p className="whitespace-nowrap"> Múltipla escolha</p>
                </Button>
                <Separator orientation="vertical" />
                <Button
                  onClick={() => form.setValue("type", "open_ended")}
                  variant={
                    form.getValues("type") === "open_ended"
                      ? "secondary"
                      : "ghost"
                  }
                  type="button"
                  className="w-1/2 rounded-none rounded-r-lg"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  <p className="whitespace-nowrap"> Resposta aberta</p>
                </Button>
              </div>
              <Button disabled={isLoading} type="submit" variant={"outline"}>
                Começar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
