import { IsNumber, Min, Max } from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  @Min(30)
  @Max(250)
  pesoActual: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  porcentajeGrasa: number;

  @IsNumber()
  @Min(0)
  @Max(10000)
  calorias: number;
}
