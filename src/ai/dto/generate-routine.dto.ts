import { IsNumber, IsString, Min, Max } from 'class-validator';

export class GenerateRoutineDto {
  @IsNumber()
  @Min(13)
  @Max(100)
  age: number;

  @IsNumber()
  @Min(30)
  @Max(250)
  weight: number;

  @IsNumber()
  @Min(100)
  @Max(250)
  height: number;

  @IsString()
  goal: string; // 'ganar músculo', 'perder grasa', 'resistencia', 'fuerza'

  @IsString()
  level: string; // 'principiante', 'intermedio', 'avanzado'

  @IsString()
  equipment: string; // 'sin equipo', 'mancuernas', 'gimnasio completo', 'cardio'
}
