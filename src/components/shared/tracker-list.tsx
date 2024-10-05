import { useState } from "react";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import { calculateProgressValue } from "@/modules/exercise/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExerciseItemCard } from "@/components/shared/exercise-item-card";
import { ExerciseItem } from "@/modules/exercise/types";
import { initialExerciseItems } from "@/modules/exercise/data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

/**
 * Component
 */
export function TrackerList() {
  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>([]);

  const [progressValue, setProgressValue] = useState(
    calculateProgressValue(initialExerciseItems)
  );

  function addExercise(addExerciseItem: ExerciseItem) {
    const newExerciseItem = {
      title: addExerciseItem.title,
      calories: addExerciseItem.calories,
      id: nanoid(),
    };

    const newProgressValue = progressValue + newExerciseItem.calories / 10;

    setExerciseItems([...exerciseItems, newExerciseItem]);
    setProgressValue(newProgressValue);
  }

  function handleSubmitExercise(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    let exerciseCalories = Number(formData.get("exercise-calories"));
    if (exerciseCalories <= 0) {
      exerciseCalories = 0;
    }

    const newExerciseItem = {
      id: nanoid(),
      title: String(formData.get("exercise-name")),
      calories: exerciseCalories,
    };

    addExercise(newExerciseItem);
    event.currentTarget.reset();
  }

  return (
    <section id="opening" className="px-4 md:px-8 lg:px-16">
      <h1 className="text-white text-3xl text-center font-semibold">
        Your Goals Today!
      </h1>

      <p className="text-white text-center mb-8 mt-2">
        Do the habit and earn a shiny medal.
      </p>

      <Progress className="bg-white h-6 rounded-full" value={progressValue} />

      <Card className="w-full max-w-md mx-auto my-10 md:my-10">
        <CardHeader>
          <CardTitle className="text-white text-center">
            Calorie Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <form onSubmit={handleSubmitExercise}>
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
              <Button type="submit">Add</Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <div id="cardItem" className="my-20">
        {exerciseItems.map((exerciseItem) => {
          return (
            <ExerciseItemCard
              key={nanoid()}
              title={exerciseItem.title}
              calories={exerciseItem.calories}
            />
          );
        })}
      </div>
    </section>
  );
}
