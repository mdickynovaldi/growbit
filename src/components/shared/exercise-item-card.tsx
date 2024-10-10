import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Dropdown } from "@/components/shared/dropdown";
import { Form } from "react-router-dom";
import { ExerciseItemCardProps } from "@/modules/exercise/types";

export function ExerciseItemCard(props: ExerciseItemCardProps) {
  return (
    <Card className="my-10 transition-transform transform hover:scale-105">
      <CardHeader>
        <div className="flex justify-between items-center my-2">
          <h1 className="text-white text-2xl font-bold">{props.title}</h1>
          <Dropdown exerciseId={props.id} />
        </div>
        <p className="text-white text-2xl font-bold">
          Calories: {props.calories}
        </p>
        <p className="text-white text-2xl font-thin">
          Created At: {new Date(props.createdAt).toLocaleDateString()}
        </p>
        <Form action={`/destroy/${props.id}`} method="post">
          <Button
            type="submit"
            name="done"
            className="rounded bg-green-500 hover:bg-green-600 transition-colors mr-2"
          >
            Done
          </Button>

          <Button
            name="skip"
            className="rounded bg-red-500 hover:bg-red-600 transition-colors"
          >
            Skip
          </Button>
        </Form>
      </CardHeader>
    </Card>
  );
}
