import { SignIn } from "../SignIn";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icons } from "../ui/icons";

export function DropdownNavbar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Icons.lock className="w-4 h-4 mr-2" />
          Entrar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SignIn />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
