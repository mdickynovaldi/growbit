import { Link, useNavigation } from "react-router-dom";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createExercise } from "@/modules/exercise/data";
import { ExerciseItem } from "@/modules/exercise/types";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type ExerciseForm = z.infer<typeof ExerciseFormSchema>;

const ExerciseFormSchema = z.object({
  exercise: z
    .string()
    .min(1, "Exercise is required")
    .max(10, "Exercise maximal 10 characters"),
  calories: z
    .number()
    .min(0, "Calories is required")
    .max(1000, "Calories maximal 1000"),
});

export function New() {
  const form = useForm<ExerciseForm>({
    resolver: zodResolver(ExerciseFormSchema),
  });

  const { handleSubmit, control, reset } = form;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onSubmit = handleSubmit(async (data) => {
    const updates: ExerciseItem = {
      id: nanoid(),
      title: data.exercise,
      calories: Number(data.calories), // Konversi string ke number
      createdAt: Date.now(),
    };
    await createExercise(updates);
    reset();
    window.location.href = "/";
  });
  return (
    <Card className="w-full max-w-md mx-auto my-10 md:my-10">
      <CardHeader>
        <CardTitle className="text-white text-center">New Exercise</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={control}
                name="exercise"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Exercise</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="calories"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Calories</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
              <Button type="button" variant="destructive" className="ml-2">
                <Link to="/">Cancel</Link>
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
