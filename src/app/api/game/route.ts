import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/next-auth";
import { quizCreationSchema } from "@/app/schemas/quizCreationSchema";
import { prisma } from "@/lib/db";
import { ZodError } from "zod";
import { urlApi } from "@/utils/UrlApi";
import { mcqQuestion, openQuestion } from "@/app/schemas/quizCreationSchema";
import { headers } from "next/headers";

export async function POST(req: Request, res: Response) {
  const session = await getAuthSession();

  if (!session?.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);

    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
      },
    });

    const response = await fetch(`${urlApi()}/questions`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ amount, topic, type }),
    }).then((res) => res.json());

    if (type === "mcq") {
      let manyData = response.questions.map((question: mcqQuestion) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];

        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });

      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === "open_ended") {
      let manyData = response.questions.map((question: openQuestion) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "open_ended",
        };
      });

      await prisma.question.createMany({
        data: manyData,
      });
    }
    return NextResponse.json({ gameId: game.id }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
