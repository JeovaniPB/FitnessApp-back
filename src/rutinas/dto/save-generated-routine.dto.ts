export class ExerciseInput {
  name: string;
  sets: string;
  reps: string;
}

export class DayRoutineInput {
  day: string;
  focus: string;
  exercises: ExerciseInput[];
}

export class SaveGeneratedRoutineDto {
  nombre: string;
  objetivo: string;
  nivel: string;
  week: DayRoutineInput[];
}
