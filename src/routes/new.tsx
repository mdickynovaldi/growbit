import {
  ActionFunctionArgs,
  Link,
  useFetcher,
  redirect,
  useNavigation,
} from "react-router-dom";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
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
import {
  ExerciseFormSchema,
  type ExerciseFormType,
} from "@/modules/exercise/schema";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const newExerciseItem: ExerciseItem = {
    id: nanoid(),
    title: String(formData.get("title")),
    calories: Number(formData.get("calories")),
    createdAt: Date.now(),
  };

  const exercise = createExercise(newExerciseItem);
  if (!exercise) return new Response("Cannot create exercise", { status: 500 });

  return redirect("/");
}

export function NewExercise() {
  const fetcher = useFetcher();

  const form = useForm<ExerciseFormType>({
    resolver: zodResolver(ExerciseFormSchema),
    defaultValues: {
      title: "",
      calories: 0,
    },
  });
  const { handleSubmit, control } = form;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onSubmit = handleSubmit(async (data) => {
    const exerciseItemData: ExerciseItem = {
      id: nanoid(),
      title: data.title,
      calories: Number(data.calories),
      createdAt: Date.now(),
    };
    if (!exerciseItemData) return null;

    fetcher.submit(exerciseItemData, {
      method: "post",
      action: "/new",
    });
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
                name="title"
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

              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <Button asChild type="button" variant="destructive">
                  <Link to="/">Cancel</Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
