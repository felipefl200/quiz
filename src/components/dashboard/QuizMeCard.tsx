"use client";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";

export function QuizMeCard() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/quiz")}
      className="grid group grid-cols-2 grid-flow-row hover:opacity-60 hover:cursor-pointer border-[1px] p-4 rounded-md border-slate-200 transition-opacity duration-200"
    >
      <div>
        <p className="text-2xl font-bold tracking-tight">Começar um quiz</p>
        <p className="text-sm font-medium text-muted-foreground">
          Desafie-se com um quiz
        </p>
      </div>
      <div className="flex justify-end">
        <Icons.brain className="group-hover:scale-110 transition-transform duration-300 w-12 h-12" />
      </div>
    </div>
  );
}
