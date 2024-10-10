import { ExerciseItem } from "@/modules/exercise/types";
import localforage from "localforage";

export const initialExerciseItems: ExerciseItem[] = [];

export async function getExercises() {
  await fakeNetwork();
  let exercises: ExerciseItem[] =
    (await localforage.getItem("exercises")) || [];
  return exercises;
}

export async function getCalories() {
  await fakeNetwork();
  let calories: number = (await localforage.getItem("calories")) || 0;
  let totalCalories = calories / 10;
  return totalCalories;
}

export async function createExercise(updates: ExerciseItem) {
  await fakeNetwork();

  let exercise: ExerciseItem = {
    id: updates.id,
    title: updates.title,
    calories: updates.calories,
    createdAt: updates.createdAt,
  };
  let exercises = await getExercises();
  exercises.unshift(exercise);
  await set(exercises);
  return exercise;
}

export async function getExercise(id: string) {
  await fakeNetwork(`exercise:${id}`);
  let exercises: ExerciseItem[] =
    (await localforage.getItem("exercises")) || [];

  let exercise = exercises.find((exercise) => exercise.id === id);
  return exercise ?? null;
}

export async function updateExercise(id: string, updates: ExerciseItem) {
  await fakeNetwork();
  let exercises: ExerciseItem[] =
    (await localforage.getItem("exercises")) || [];
  let exercise = exercises.find((exercise) => exercise.id === id);
  if (!exercise) throw new Error(`No exercise found for id: ${id}`);
  Object.assign(exercise, updates);
  await set(exercises);
  return exercise;
}

export async function deleteExercise(id: string) {
  let exercises: ExerciseItem[] =
    (await localforage.getItem("exercises")) || [];
  let index = exercises.findIndex((exercise) => exercise.id === id);
  let calories = exercises[index].calories;
  setCalories(calories);
  if (index > -1) {
    exercises.splice(index, 1);
    await set(exercises);
    return true;
  }
  return false;
}

function set(exercises: ExerciseItem[]) {
  return localforage.setItem("exercises", exercises);
}
async function setCalories(calories: number) {
  let currentCalories = (await localforage.getItem("calories")) || 0;
  let newCalories = (currentCalories as number) + calories;
  return localforage.setItem("calories", newCalories);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: Record<string, boolean> = {};

async function fakeNetwork(key?: string): Promise<void> {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key as string]) {
    return;
  }

  fakeCache[key as string] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
