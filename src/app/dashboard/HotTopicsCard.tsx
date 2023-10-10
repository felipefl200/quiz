import { CustomWordCloud } from "@/components/CustomWordCloud";
import { Icons } from "@/components/ui/icons";

export function HotTopicsCard() {
  return (
    <div className="grid grid-cols-2 group border-[1px] p-4 rounded-md border-slate-200 transition-opacity duration-200">
      <div>
        <p className="text-2xl font-bold tracking-tight">Tópicos recentes</p>
        <p className="text-sm font-medium text-muted-foreground">
          Clique em um tópico para começar um novo quiz
        </p>
      </div>
      <div className="flex justify-end">
        <Icons.brainstorm className="group-hover:scale-110 transition-transform duration-300 w-12 h-12" />
      </div>
      <div className="col-span-2 my-4">
        <CustomWordCloud />
      </div>
    </div>
  );
}
