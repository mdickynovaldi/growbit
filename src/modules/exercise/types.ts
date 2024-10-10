export type ExerciseItem = {
  id?: string;
  title: string;
  calories: number;
  createdAt: number;
};

export type ExerciseItemCardProps = {
  id: string;
  title: string;
  calories: number;
  createdAt: number;
};

export type DropdownProps = {
  exerciseId: string;
};
