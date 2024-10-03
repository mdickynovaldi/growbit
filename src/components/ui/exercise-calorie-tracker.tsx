"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function ExerciseCalorieTracker() {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);

  return (
    <Card className="w-full max-w-md mx-auto my-52 md:my-52">
      <CardHeader>
        <CardTitle className="text-white text-center">
          Calorie Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <form>
            <Label className="text-white" htmlFor="exercise-name">
              Exercise
            </Label>
            <Input
              id="exercise-name"
              placeholder="What exercise do you want to do today?"
              value={name}
              className="text-white rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full text-white bg-green-400 rounded hover:bg-green-500">
              Set Calorie Goal
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-white text-center">
                  Set your calorie burning goal
                </DrawerTitle>
                <DrawerDescription className="text-white text-center">
                  Move the slider to set your goal
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <Input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-24 text-white"
                  />
                  <span className="text-white">calories</span>
                </div>
                <div className="mt-3 h-[120px]">
                  <input
                    type="range"
                    min={0}
                    max={2000}
                    step={50}
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button className="text-white" variant="outline">
                    Confirm
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
        {name && calories > 0 && (
          <p className="text-center text-white">
            Hello, {name}! Your goal is to burn {calories} calories.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
