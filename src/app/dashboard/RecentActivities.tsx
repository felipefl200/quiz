import { Icons } from "@/components/ui/icons";

export function RecentActivities() {
  return (
    <div className="grid grid-cols-2 border-[1px] p-4 rounded-md border-slate-200 transition-opacity duration-200">
      <div>
        <p className="text-2xl font-bold tracking-tight">Atividades recentes</p>
        <p className="text-sm font-medium text-muted-foreground">
          Você participou de 12 quizzes recentemente
        </p>
      </div>
      {/* Items */}
      <div className="col-span-2 my-4">
        <div className="flex gap-4">
          <div className="self-center">
            <Icons.pen className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold underline ">titulo do quiz</p>
            <div className="bg-zinc-950 flex items-center rounded-md text-sm px-2">
              <Icons.clock className="w-5 h-5 -ml-1 text-white" />
              <p className="text-xs pl-1 text-white">29/09/2023</p>
            </div>
            <p className="leading-tight">tipo do quiz</p>
          </div>
        </div>
      </div>
    </div>
  );
}
