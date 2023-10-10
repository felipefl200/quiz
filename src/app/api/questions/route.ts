import { quizCreationSchema } from "@/app/schemas/quizCreationSchema";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request, res: Response) => {
  const session = await getAuthSession();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);

    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output(
        "Você é uma IA útil que é capaz de gerar um par de perguntas e respostas, o comprimento de cada resposta não deve ser superior a 15 palavras, armazenar todos os pares de respostas e perguntas em uma matriz JSON",
        new Array(amount).fill(
          `Você deve gerar perguntas aleatórias e abertas sobre ${topic}`
        ),
        {
          question: "question",
          answer: "resposta com comprimento máximo de 15 palavras",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        "Você é uma IA útil que é capaz de gerar perguntas e respostas MCQ, o comprimento de cada resposta não deve ser superior a 15 palavras, armazenar todas as respostas, perguntas e opções em uma matriz JSON",
        new Array(amount).fill(
          `Você deve gerar uma pergunta de multipla escolha aleatória e difícil sobre ${topic}`
        ),
        {
          question: "question",
          answer: "resposta com comprimento máximo de 15 palavras",
          option1: "opções com comprimento máximo de 15 palavras",
          option2: "opções com comprimento máximo de 15 palavras",
          option3: "opções com comprimento máximo de 15 palavras",
        }
      );
    }
    return NextResponse.json({ questions: questions }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 });
    } else {
      console.log("GPT error", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
};
