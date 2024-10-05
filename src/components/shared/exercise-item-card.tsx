import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Dropdown } from "@/components/shared/dropdown";

export function ExerciseItemCard({
  title,
  calories,
}: {
  title: string;
  calories: number;
}) {
  return (
    <Card className="my-10 transition-transform transform hover:scale-105">
      <CardHeader>
        <div className="flex justify-between items-center my-2">
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          <Dropdown />
        </div>

        <p className="text-white text-2xl font-bold">Calories: {calories}</p>

        <div className="flex gap-3">
          <Button className="rounded bg-green-500 hover:bg-green-600 transition-colors">
            Done
          </Button>

          <Button
            className="rounded text-red-500 hover:bg-red-600 transition-colors"
            variant="outline"
          >
            Skip
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
