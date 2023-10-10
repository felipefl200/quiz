import { getAuthSession } from "@/lib/next-auth";
import Link from "next/link";
import { UserAccountNav } from "../UserAccountNav";
import { ThemeToggle } from "../ThemeToggle";
import { DropdownNavbar } from "./DropdownNavBar";
export async function Navbar() {
  const session = await getAuthSession();
  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="relative flex items-center gap-2 transition-all hover:translate-y-[2px]"
        >
          <div className="absolute inset-0 bg-blue-900 dark:bg-blue-700 transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-md"></div>
          <div className="relative rounded-lg border-2 border-b-4 bg-white dark:bg-zinc-950 border-r-4 border-black text-xl px-2 py-1 font-bold md:block dark:border-white">
            <p>QuizApp</p>
          </div>
        </Link>
        <div className="flex items-center">
          <ThemeToggle className="mr-2" />
          {session?.user ? (
            // <h1>Olá, {session.user.name}!</h1>
            <UserAccountNav user={session.user} />
          ) : (
            <DropdownNavbar />
          )}
        </div>
      </div>
    </div>
  );
}
