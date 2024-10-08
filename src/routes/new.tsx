import localforage from "localforage";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExerciseItem } from "@/modules/exercise/types";
import { nanoid } from "nanoid";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { calculateProgressValue } from "@/modules/exercise/progress";
import { initialExerciseItems } from "@/modules/exercise/data";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function New() {
  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>([]);

  const [progressValue, setProgressValue] = useState(
    calculateProgressValue(initialExerciseItems)
  );

  useEffect(() => {
    loadData();
  }, []);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const storedItems = await localforage.getItem<ExerciseItem[]>(
        "exerciseItems"
      );
      if (storedItems) {
        setExerciseItems(storedItems);
        setProgressValue(calculateProgressValue(storedItems));
      }
    } catch (err) {
      console.error("Gagal memuat data:", err);
    }
  };

  const saveData = async (items: ExerciseItem[]) => {
    try {
      await localforage.setItem("exerciseItems", items);
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
    }
  };

  function addExercise(addExerciseItem: ExerciseItem) {
    const newExerciseItem = {
      id: nanoid(),
      title: addExerciseItem.title,
      calories: addExerciseItem.calories,
    };

    const newProgressValue = progressValue + newExerciseItem.calories / 10;

    const updatedExerciseItems = [...exerciseItems, newExerciseItem];
    setExerciseItems(updatedExerciseItems);
    setProgressValue(newProgressValue);

    saveData(updatedExerciseItems);
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

    navigate("/");
  }

  return (
    <main className="w-1/2 mx-auto">
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
              <div className="flex gap-2">
                <Button type="submit">Add</Button>
                <Link to="/">
                  <Button variant="outline">Back</Button>
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
