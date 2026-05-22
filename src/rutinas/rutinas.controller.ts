import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { RutinasService } from './rutinas.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateRoutineStatusDto } from './dto/update-routine-status.dto';
import { CreateProgressDto } from './dto/create-progress.dto';

@Controller('rutinas')
export class RutinasController {
  constructor(private readonly rutinasService: RutinasService) {}

  /**
   * Obtener todas las rutinas del usuario autenticado
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserRoutines(
    @Request() req: any,
    @Query('estado') estado?: string,
  ) {
    return this.rutinasService.getUserRoutines(req.user.id, estado);
  }

  /**
   * Obtener una rutina específica
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getRutineById(@Param('id') rutineId: string, @Request() req: any) {
    return this.rutinasService.getRutineById(rutineId, req.user.id);
  }

  /**
   * Actualizar estado de una rutina
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  async updateRoutineStatus(
    @Param('id') rutineId: string,
    @Body() statusDto: UpdateRoutineStatusDto,
    @Request() req: any,
  ) {
    return this.rutinasService.updateRoutineStatus(
      rutineId,
      req.user.id,
      statusDto,
    );
  }

  /**
   * Obtener historial de rutinas
   */
  @UseGuards(JwtAuthGuard)
  @Get('historial/all')
  async getRoutineHistory(@Request() req: any) {
    return this.rutinasService.getRoutineHistory(req.user.id);
  }

  /**
   * Registrar progreso físico
   */
  @UseGuards(JwtAuthGuard)
  @Post('progreso')
  async registerProgress(
    @Body() progressDto: CreateProgressDto,
    @Request() req: any,
  ) {
    return this.rutinasService.registerProgress(req.user.id, progressDto);
  }

  /**
   * Obtener historial de progreso
   */
  @UseGuards(JwtAuthGuard)
  @Get('progreso/historial')
  async getUserProgress(@Request() req: any) {
    return this.rutinasService.getUserProgress(req.user.id);
  }

  /**
   * Obtener estadísticas de progreso
   */
  @UseGuards(JwtAuthGuard)
  @Get('progreso/estadisticas')
  async getProgressStats(@Request() req: any) {
    return this.rutinasService.getProgressStats(req.user.id);
  }
}
