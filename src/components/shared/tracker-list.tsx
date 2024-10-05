import { useState } from "react";

import { Progress } from "@/components/ui/progress";
import { ExerciseCardItem } from "@/components/shared/ExerciseCardItem";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { nanoid } from "nanoid";

type ExerciseItem = {
  id: string;
  title: string;
  calories: number;
};

const initialExerciseItems: ExerciseItem[] = [];

export function TrackerList() {
  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>([]);

  const [progressValue, setProgressValue] = useState(
    calculateProgressValue(initialExerciseItems)
  );

  function calculateProgressValue(exerciseItems: ExerciseItem[]) {
    const totalCalories = exerciseItems.reduce((sum, item) => {
      return sum + item.calories;
    }, 0);
    return totalCalories / 10;
  }

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

    const exerciseNameInput = document.getElementById(
      "exercise-name"
    ) as HTMLInputElement;
    const exerciseCaloriesInput = document.getElementById(
      "exercise-calories"
    ) as HTMLInputElement;

    const exerciseName = exerciseNameInput.value;
    const exerciseCalories = parseInt(exerciseCaloriesInput.value);

    if (exerciseName && !isNaN(exerciseCalories)) {
      addExercise({
        title: exerciseName,
        calories: exerciseCalories,
        id: nanoid(),
      });

      exerciseNameInput.value = "";
      exerciseCaloriesInput.value = "";
    } else {
      alert("Mohon masukkan nama latihan dan jumlah kalori yang valid.");
    }
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
              <Label className="text-white">Exercise</Label>
              <Input
                id="exercise-name"
                placeholder="What exercise do you want to do today?"
                className="text-white rounded"
              />
              <Label className="text-white mt-4">Kalori</Label>
              <Input
                id="exercise-calories"
                type="number"
                placeholder="Berapa kalori yang ingin Anda bakar?"
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
            <ExerciseCardItem
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
