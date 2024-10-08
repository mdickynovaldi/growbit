import { MoreVertical, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type ExerciseDropdownProps = {
  onEdit?: () => void;
  onSkip: () => void;
};
export function Dropdown(props: ExerciseDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only ">Open menu</span>
          <MoreVertical className="h-4 w-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className=" bg-slate-500 rounded">
        <div className="hover:bg-gray-200 w-full rounded">
          <DropdownMenuItem onClick={props.onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
        </div>
        <div className="hover:bg-gray-200 w-full rounded">
          <DropdownMenuItem onClick={props.onSkip}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
