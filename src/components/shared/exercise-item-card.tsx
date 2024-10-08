import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Dropdown } from "@/components/shared/dropdown";

type ExerciseItemCardProps = {
  title: string;
  calories: number;
  onDone?: () => void;
  onSkip: () => void;
  onEdit: () => void;
};

export function ExerciseItemCard(props: ExerciseItemCardProps) {
  return (
    <Card className="my-10 transition-transform transform hover:scale-105">
      <CardHeader>
        <div className="flex justify-between items-center my-2">
          <h1 className="text-white text-2xl font-bold">{props.title}</h1>
          <Dropdown onSkip={props.onSkip} onEdit={props.onEdit} />
        </div>

        <p className="text-white text-2xl font-bold">
          Calories: {props.calories}
        </p>

        <div className="flex gap-3">
          <Button
            className="rounded bg-green-500 hover:bg-green-600 transition-colors"
            onClick={props.onDone}
          >
            Done
          </Button>

          <Button
            className="rounded text-red-500 hover:bg-red-600 transition-colors"
            variant="outline"
            onClick={props.onSkip}
          >
            Skip
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
