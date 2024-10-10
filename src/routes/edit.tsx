import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
  type LoaderFunctionArgs,
} from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getExercise, updateExercise } from "@/modules/exercise/data";
import { ExerciseItem } from "@/modules/exercise/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) return new Response("ID Not Found", { status: 404 });

  const exercise = await getExercise(id);
  if (!exercise) return new Response("Exercise Not Found", { status: 404 });

  return { exercise };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const id = params.id;
  if (!id) return new Response("ID Not Found", { status: 404 });

  const formData = await request.formData();

  const updates: ExerciseItem = {
    id: params.id,
    title: String(formData.get("title")),
    calories: Number(formData.get("exercise-calories")),
    createdAt: Date.now(),
  };

  const updatedExercise = await updateExercise(id, updates);
  if (!updatedExercise)
    return new Response("Exercise Not Found", { status: 404 });

  return redirect(`/`);
}

export function EditExercise() {
  const { exercise } = useLoaderData() as { exercise: ExerciseItem };

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Card className="w-full max-w-md mx-auto my-10 md:my-10">
      <CardHeader>
        <CardTitle className="text-white text-center">
          Update Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Form method="post">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <Input
              id="title"
              name="title"
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
                  Update...
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 ">
                <Button type="submit">Update</Button>
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
