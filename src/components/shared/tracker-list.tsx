import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

import { calculateProgressValue } from "@/modules/exercise/progress";
import { ExerciseItemCard } from "@/components/shared/exercise-item-card";
import { ExerciseItem } from "@/modules/exercise/types";
import { initialExerciseItems } from "@/modules/exercise/data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function TrackerList() {
  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>([]);

  const [progressValue, setProgressValue] = useState(
    calculateProgressValue(initialExerciseItems)
  );

  const navigate = useNavigate();

  async function loadData() {
    try {
      const storedItems = await localforage.getItem<ExerciseItem[]>(
        "exerciseItems"
      );
      if (storedItems) {
        setExerciseItems(storedItems);
        setProgressValue(calculateProgressValue(storedItems));
      }
    } catch (err) {
      console.error("Failed to load data:", err);
      throw err;
    }
  }

  async function deleteItemById(id: string) {
    try {
      const storedItems = await localforage.getItem<ExerciseItem[]>(
        "exerciseItems"
      );

      if (storedItems) {
        const updatedItems = storedItems.filter((item) => item.id !== id);
        await localforage.setItem("exerciseItems", updatedItems);

        setExerciseItems(updatedItems);
        setProgressValue(calculateProgressValue(updatedItems));
      }
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section id="opening" className="px-4 md:px-8 lg:px-16">
      <h1 className="text-white text-3xl text-center font-semibold">
        Your Goals Today!
      </h1>

      <p className="text-white text-center mb-8 mt-2">
        Do the habit and earn a shiny medal.
      </p>

      <Progress
        className="bg-white h-6 rounded-full mb-10"
        value={progressValue}
      />
      <Link to="/new">
        <Button className="rounded bg-green-500 hover:bg-green-600 transition-colors mx-auto block">
          Add Exercise
        </Button>
      </Link>

      <div id="cardItem" className="my-20">
        {exerciseItems.map((exerciseItem) => {
          return (
            <ExerciseItemCard
              key={nanoid()}
              title={exerciseItem.title}
              calories={exerciseItem.calories}
              onDone={() => deleteItemById(exerciseItem.id)}
              onSkip={() => deleteItemById(exerciseItem.id)}
              onEdit={() => navigate(`/edit/${exerciseItem.id}`)}
            />
          );
        })}
      </div>
    </section>
  );
}
