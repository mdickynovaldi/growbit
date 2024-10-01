"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function InputName() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Nama yang disubmit:", name);
    setIsOpen(false);
    setIsSubmitted(true);
  };

  return (
    <div className="flex items-end justify-center ">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {!isSubmitted ? (
          <DialogTrigger asChild>
            <Button className="text-white text-2xl" variant="link">
              Input Name
            </Button>
          </DialogTrigger>
        ) : (
          <div className="flex gap-3 ">
            <h1 className="text-3xl pt-6 font-thin text-white">Welcome</h1>
            <h1 className="text-white text-3xl font-bold pt-6">{name}</h1>
          </div>
        )}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Enter Name</DialogTitle>
            <DialogDescription className="text-white">
              Please enter your name below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              className="text-white"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <DialogFooter>
            <Button className="text-white" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
