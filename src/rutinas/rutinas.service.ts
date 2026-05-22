import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineStatusDto } from './dto/update-routine-status.dto';
import { CreateProgressDto } from './dto/create-progress.dto';
import { SaveGeneratedRoutineDto } from './dto/save-generated-routine.dto';

@Injectable()
export class RutinasService {
  constructor(private prisma: PrismaService) {}

  /**
   * Guardar una rutina generada por la IA
   */
  async saveGeneratedRoutine(
    userId: string,
    data: SaveGeneratedRoutineDto,
  ) {
    // Crear la rutina
    const rutina = await this.prisma.rutina.create({
      data: {
        nombre: data.nombre,
        objetivo: data.objetivo,
        nivel: data.nivel,
        diasSemana: data.week.length,
        usuarioId: userId,
        fechaInicio: new Date(),
      } as any,
    });

    // Crear los ejercicios asociados
    const ejerciciosData: any[] = [];
    for (const day of data.week) {
      for (const exercise of day.exercises) {
        ejerciciosData.push({
          nombre: exercise.name,
          series: exercise.sets.toString(),
          repeticiones: exercise.reps.toString(),
          descanso: 60,
          rutinaId: rutina.id,
        });
      }
    }

    if (ejerciciosData.length > 0) {
      await this.prisma.ejercicio.createMany({
        data: ejerciciosData,
      });
    }

    return this.getRutineById(rutina.id, userId);
  }

  /**
   * Obtener todas las rutinas de un usuario
   */
  async getUserRoutines(userId: string, estado?: string) {
    const filter: any = { usuarioId: userId };

    if (estado) {
      filter.estado = estado;
    }

    return await this.prisma.rutina.findMany({
      where: filter,
      include: {
        ejercicios: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Obtener una rutina específica
   */
  async getRutineById(rutineId: string, userId: string) {
    const rutina = await this.prisma.rutina.findUnique({
      where: { id: rutineId },
      include: {
        ejercicios: true,
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
    });

    if (!rutina) {
      throw new NotFoundException('Rutina no encontrada');
    }

    // Verificar que la rutina pertenece al usuario
    if (rutina.usuarioId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para ver esta rutina',
      );
    }

    return rutina;
  }

  /**
   * Actualizar el estado de una rutina
   */
  async updateRoutineStatus(
    rutineId: string,
    userId: string,
    statusDto: UpdateRoutineStatusDto,
  ) {
    const rutina = await this.prisma.rutina.findUnique({
      where: { id: rutineId },
    });

    if (!rutina) {
      throw new NotFoundException('Rutina no encontrada');
    }

    if (rutina.usuarioId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar esta rutina',
      );
    }

    return await this.prisma.rutina.update({
      where: { id: rutineId },
      data: {
        estado: statusDto.estado,
      } as any,
      include: {
        ejercicios: true,
      },
    });
  }

  /**
   * Obtener el historial de rutinas (archivadas y completadas)
   */
  async getRoutineHistory(userId: string) {
    return await this.prisma.rutina.findMany({
      where: {
        usuarioId: userId,
        estado: { in: ['archivada', 'completada'] } as any,
      },
      include: {
        ejercicios: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Registrar progreso físico del usuario
   */
  async registerProgress(userId: string, progressDto: CreateProgressDto) {
    const progreso = await this.prisma.progreso.create({
      data: {
        pesoActual: progressDto.pesoActual,
        porcentajeGrasa: progressDto.porcentajeGrasa,
        calorias: progressDto.calorias,
        usuarioId: userId,
      },
    });

    return progreso;
  }

  /**
   * Obtener historial de progreso del usuario
   */
  async getUserProgress(userId: string) {
    return await this.prisma.progreso.findMany({
      where: { usuarioId: userId },
      orderBy: {
        fecha: 'desc',
      },
    });
  }

  /**
   * Obtener estadísticas de progreso
   */
  async getProgressStats(userId: string) {
    const progresos = await this.prisma.progreso.findMany({
      where: { usuarioId: userId },
      orderBy: {
        fecha: 'asc',
      },
    });

    if (progresos.length === 0) {
      return null;
    }

    const primerProgreso = progresos[0];
    const ultimoProgreso = progresos[progresos.length - 1];

    return {
      inicialWeight: primerProgreso.pesoActual,
      currentWeight: ultimoProgreso.pesoActual,
      weightChange: ultimoProgreso.pesoActual - primerProgreso.pesoActual,
      initialFatPercentage: primerProgreso.porcentajeGrasa,
      currentFatPercentage: ultimoProgreso.porcentajeGrasa,
      fatPercentageChange:
        ultimoProgreso.porcentajeGrasa - primerProgreso.porcentajeGrasa,
      startDate: primerProgreso.fecha,
      lastUpdate: ultimoProgreso.fecha,
      totalRecords: progresos.length,
    };
  }
}
