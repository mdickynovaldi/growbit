import { Button } from "@/components/ui/button";
import { ExerciseItemCard } from "@/components/shared/exercise-item-card";
import { Progress } from "@/components/ui/progress";

import { useLoaderData, Link } from "react-router-dom";
import { ExerciseItem } from "@/modules/exercise/types";
import { nanoid } from "nanoid";

/**
 * Component
 */
export function TrackerList() {
  const { exercises } = useLoaderData() as { exercises: ExerciseItem[] };
  const { totalCalories } = useLoaderData() as { totalCalories: number };

  const isGoalAchieved = totalCalories >= 100;

  return (
    <section
      id="opening"
      className="px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto"
    >
      <h1 className="text-white text-2xl sm:text-3xl text-center font-semibold">
        Your Goals Today!
      </h1>

      <p className="text-white text-sm sm:text-base text-center mb-6 sm:mb-8 mt-2">
        Do the habit and earn a shiny medal.
      </p>

      <Progress
        className="bg-white h-4 sm:h-6 rounded-full"
        value={totalCalories}
      />

      {isGoalAchieved && (
        <p className="text-green-500 text-center mt-4">
          Congratulations! You have achieved your goal!
        </p>
      )}

      <div className="flex justify-center mt-8 sm:mt-10">
        {isGoalAchieved ? (
          <Button className="w-full sm:w-auto" disabled>
            Add
          </Button>
        ) : (
          <Link to="/new">
            <Button className="w-full sm:w-auto">Add</Button>
          </Link>
        )}
      </div>

      <div id="cardItem" className="my-12 sm:my-16 md:my-20">
        {exercises.length === 0 ? (
          <h1 className="text-white text-xl sm:text-2xl text-center">
            No exercises added yet
          </h1>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:gap-10">
            {exercises.map((exerciseItem) => (
              <ExerciseItemCard
                key={nanoid()}
                id={exerciseItem.id || nanoid()}
                title={exerciseItem.title}
                calories={exerciseItem.calories}
                createdAt={exerciseItem.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
