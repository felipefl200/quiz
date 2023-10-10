import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "O tópico precisa de 4 caracteres no mínimo" }),
  type: z.enum(["mcq", "open_ended"]),
  amount: z.number().min(1, { message: "A quantidade mínima é 1" }).max(10),
});

export type mcqQuestion = {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
};

export type openQuestion = {
  question: string;
  answer: string;
};
