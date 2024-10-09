import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateExercise } from "@/modules/exercise/data";
import { ExerciseItem } from "@/modules/exercise/types";

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  const formData = await request.formData();
  const updates: ExerciseItem = {
    id: params.id,
    title: formData.get("exercise-name") as string,
    calories: Number(formData.get("exercise-calories")),
    createdAt: Date.now(),
    isDone: false,
  };
  await updateExercise(params.id, updates);
  return redirect(`/`);
}

export function Edit() {
  const { exercise } = useLoaderData() as { exercise: ExerciseItem };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Card className="w-full max-w-md mx-auto my-10 md:my-10">
      <CardHeader>
        <CardTitle className="text-white text-center">Edit Exercise</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Form method="post">
            <Label htmlFor="exercise-name" className="text-white">
              Exercise
            </Label>
            <Input
              id="exercise-name"
              name="exercise-name"
              placeholder="What exercise do you want to do today?"
              className="text-white rounded"
              defaultValue={exercise.title}
            />
            <Label htmlFor="exercise-calories" className="text-white mt-4">
              Calorie
            </Label>
            <Input
              id="exercise-calories"
              name="exercise-calories"
              type="number"
              placeholder="How many calories do you want to burn?"
              className="text-white rounded mt-2 mb-4"
              defaultValue={exercise.calories}
            />
            {isSubmitting ? (
              <div className="flex gap-2 ">
                <Button type="submit" disabled={isSubmitting}>
                  Adding...
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 ">
                <Button type="submit">Add</Button>
                <Link to="/">
                  <Button variant="cancel">Cancel</Button>
                </Link>
              </div>
            )}
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
