import localforage from "localforage";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExerciseItem } from "@/modules/exercise/types";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { calculateProgressValue } from "@/modules/exercise/progress";
import { initialExerciseItems } from "@/modules/exercise/data";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Edit() {
  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>([]);

  const [progressValue, setProgressValue] = useState(
    calculateProgressValue(initialExerciseItems)
  );

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedItems = await localforage.getItem<ExerciseItem[]>(
          "exerciseItems"
        );
        if (storedItems) {
          const targetItem = storedItems.find((item) => item.id === id);
          if (targetItem) {
            setExerciseItems([targetItem]);
            setProgressValue(calculateProgressValue([targetItem]));
          } else {
            console.error("Item tidak ditemukan");
            navigate("/");
          }
        }
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    };
    loadData();
  }, [id]);

  async function editItemById(id: string, updatedData: Partial<ExerciseItem>) {
    try {
      const storedItems = await localforage.getItem<ExerciseItem[]>(
        "exerciseItems"
      );

      if (storedItems) {
        const updatedItems = storedItems.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        );

        await localforage.setItem("exerciseItems", updatedItems);

        setExerciseItems(updatedItems);
        setProgressValue(calculateProgressValue(updatedItems));
      }
    } catch (err) {
      console.error("Failed to edit item:", err);
    }
  }

  function handleEditExercise(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    let exerciseCalories = Number(formData.get("exercise-calories"));
    if (exerciseCalories <= 0) {
      exerciseCalories = 0;
    }

    const exerciseName = String(formData.get("exercise-name"));

    const updatedExerciseItem = {
      id: id,
      title: exerciseName,
      calories: exerciseCalories,
    };

    editItemById(id!, updatedExerciseItem);

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
            <form onSubmit={handleEditExercise}>
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
                <Button type="submit">Edit</Button>
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
