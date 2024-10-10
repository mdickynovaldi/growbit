import { Header } from "@/components/layout/header";
import { TrackerList } from "@/components/shared/tracker-list";
import { getCalories, getExercises } from "@/modules/exercise/data";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  // Logged in / authenticated user
  const exercises = await getExercises();
  const totalCalories = await getCalories();

  return { exercises, totalCalories };
}

export function HomeRoute() {
  const { exercises, totalCalories } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <>
      <Header />
      <TrackerList exercises={exercises} totalCalories={totalCalories} />
      {/* TODO: Footer */}
    </>
  );
}
