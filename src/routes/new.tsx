import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { nanoid } from "nanoid";

import { createExercise } from "@/modules/exercise/data";
import { ExerciseItem } from "@/modules/exercise/types";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const updates: ExerciseItem = {
    id: nanoid(),
    title: formData.get("exercise-name") as string,
    calories: Number(formData.get("exercise-calories")),
    createdAt: Date.now(),
  };
  await createExercise(updates);
  return redirect("/");
}

export function New() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Card className="w-full max-w-md mx-auto my-10 md:my-10">
      <CardHeader>
        <CardTitle className="text-white text-center">New Exercise</CardTitle>
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
