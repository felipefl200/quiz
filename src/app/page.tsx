import { SignInButtonWithGitHub } from "@/components/SignInButtonWithGithub";
import { SignInButtonWithGoogle } from "@/components/SignInButtonWithGoogle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Seja Bem-vindo ao Quiz</CardTitle>
          <CardDescription className="text-center">
            Quiz é um projeto desenvolvido para estudos. Ele consiste em criar
            uma serie de perguntas e respostas para que o usuário possa testar
            seus conhecimentos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Você {!session?.user && "não"} esta logado no sistema
              </span>
            </div>
          </div>
          <div
            className={`${
              session?.user ? "grid-cols-1" : "grid-cols-2"
            } grid gap-2`}
          >
            {session?.user ? (
              <Button variant="outline" className="w-full">
                <Link href="/dashboard">Ir para o Dashboard</Link>
              </Button>
            ) : (
              <>
                <SignInButtonWithGoogle text="Google" />
                <SignInButtonWithGitHub text="GitHub" />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
