import { Link } from "react-router-dom";

import { MoreVertical, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownProps } from "@/modules/exercise/types";

export function Dropdown(props: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only ">Open menu</span>
          <MoreVertical className="h-4 w-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className=" bg-slate-500 rounded">
        <div className=" w-full rounded">
          <DropdownMenuItem asChild>
            <Link to={`/edit/${props.exerciseId}`} className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
