import { Body, Controller, Post } from '@nestjs/common';

import { AiService } from './ai.service';

import { GenerateRoutineDto } from './dto/generate-routine.dto';
import { RoutineResponseDto } from './dto/routine-response.dto';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
  ) {}

  @Post('generate-routine')
  generateRoutine(
    @Body() user: GenerateRoutineDto,
  ): Promise<RoutineResponseDto> {
    return this.aiService.generateRoutine(user);
  }
}
