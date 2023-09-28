import { getAuthSession } from "@/lib/next-auth";
import Link from "next/link";
import { SignInButton } from "./SignInButton";
import { UserAccountNav } from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
export async function Navbar() {
  const session = await getAuthSession();

  console.log(session);

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black text-xl px-2 py-1 font-bold transition-all hover:translate-y-[2px] md:block dark:border-white">
            QuizApp
          </p>
        </Link>
        <div className="flex items-center">
          <ThemeToggle className="mr-2" />
          {session?.user ? (
            // <h1>Olá, {session.user.name}!</h1>
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
    </div>
  );
}
