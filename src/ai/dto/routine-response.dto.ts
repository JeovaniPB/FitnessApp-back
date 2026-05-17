export class ExerciseDto {
  name: string;
  sets: string;
  reps: string;
}

export class DayRoutineDto {
  day: string;
  focus: string;
  exercises: ExerciseDto[];
}

export class RoutineResponseDto {
  week: DayRoutineDto[];
}
