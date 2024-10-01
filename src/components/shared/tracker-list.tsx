import { useState } from "react";

import { Progress } from "@/components/ui/progress";
import { ExerciseCardItem } from "@/components/shared/card-item";
import { Button } from "../ui/button";

type ExerciseItem = {
  id: number;
  title: string;
  calories: number;
};

type AddExerciseItem = Omit<ExerciseItem, "id">;

const initialExerciseItems: ExerciseItem[] = [
  { id: 1, title: "Push Up", calories: 100 },
  { id: 2, title: "Sit Up", calories: 200 },
];

export function TrackerList() {
  const [exerciseItems, setExerciseItems] =
    useState<ExerciseItem[]>(initialExerciseItems);

  const [progressValue, setProgressValue] = useState(
    calculateProgressValue(initialExerciseItems)
  );

  function calculateProgressValue(exerciseItems: ExerciseItem[]) {
    const totalCalories = exerciseItems.reduce((total, exerciseItem) => {
      return total + exerciseItem.calories;
    }, 0);

    return totalCalories / 10;
  }

  function addExercise(addExerciseItem: AddExerciseItem) {
    const newExerciseItem = {
      ...addExerciseItem,
      id: exerciseItems[exerciseItems.length - 1].id + 1, // TODO: Use nanoid
    };

    const newProgressValue = progressValue + newExerciseItem.calories / 10;

    setExerciseItems([...exerciseItems, newExerciseItem]);
    setProgressValue(newProgressValue);
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

      <div className="flex flex-col">
        <Button onClick={() => addExercise({ title: "Dummy", calories: 100 })}>
          Add Dummy Exercise
        </Button>
      </div>

      <div id="cardItem" className="my-20">
        {exerciseItems.map((exerciseItem) => {
          return (
            <ExerciseCardItem
              key={exerciseItem.id}
              title={exerciseItem.title}
              calories={exerciseItem.calories}
            />
          );
        })}
      </div>
    </section>
  );
}
