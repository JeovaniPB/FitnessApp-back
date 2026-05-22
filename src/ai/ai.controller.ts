import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';

import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { GenerateRoutineDto } from './dto/generate-routine.dto';
import { RoutineResponseDto } from './dto/routine-response.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * Solo generar una rutina sin guardarla
   */
  @Post('generate-routine')
  generateRoutine(
    @Body() user: GenerateRoutineDto,
  ): Promise<RoutineResponseDto> {
    return this.aiService.generateRoutine(user);
  }

  /**
   * Generar una rutina y guardarla automáticamente en la base de datos
   */
  @UseGuards(JwtAuthGuard)
  @Post('generate-and-save-routine')
  async generateAndSaveRoutine(
    @Body() user: GenerateRoutineDto,
    @Request() req: any,
  ) {
    return this.aiService.generateAndSaveRoutine(req.user.id, user);
  }
}
