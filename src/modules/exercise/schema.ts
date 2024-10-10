import { z } from "zod";

export const ExerciseFormSchema = z.object({
  title: z
    .string()
    .min(1, "Exercise is required")
    .max(10, "Exercise maximal 10 characters"),
  calories: z
    .number()
    .min(0, "Calories is required")
    .max(1000, "Calories maximal 1000"),
});

export type ExerciseFormType = z.infer<typeof ExerciseFormSchema>;
