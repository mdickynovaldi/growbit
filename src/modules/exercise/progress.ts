import { ExerciseItem } from "@/modules/exercise/types";

export function calculateProgressValue(exerciseItems: ExerciseItem[]) {
  const totalCalories = exerciseItems.reduce((sum, item) => {
    return sum + item.calories;
  }, 0);

  return totalCalories / 10; // percentage of total calories
}
