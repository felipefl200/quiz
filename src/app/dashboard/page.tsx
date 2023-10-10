import { HistoryCard } from "@/components/dashboard/HistoryCard";
import { QuizMeCard } from "@/components/dashboard/QuizMeCard";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { HotTopicsCard } from "./HotTopicsCard";
import { RecentActivities } from "./RecentActivities";

export const metadata = {
  title: "Dashboard | Quiz App",
};

export default async function Dashboard() {
  const session = await getAuthSession();
  if (!session?.user) redirect("/");
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-1 lg:grid-cols-2">
        <HotTopicsCard />
        <RecentActivities />
      </div>
    </main>
  );
}
