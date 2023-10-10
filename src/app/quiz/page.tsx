import { QuizCreation } from "@/components/QuizCreation";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "QuizApp | Aplicativo de quizzes",
};
export default async function Quiz() {
  const session = await getAuthSession();
  if (!session?.user) return redirect("/");
  return <QuizCreation />;
}
