import { PrismaClient } from '@prisma/client';

export async function seedEjercicios(prisma: PrismaClient) {
  const rutinas = await prisma.rutina.findMany();

  const pecho = await prisma.categoriaEjercicio.findFirst({
    where: { nombre: 'Pecho' },
  });

  const piernas = await prisma.categoriaEjercicio.findFirst({
    where: { nombre: 'Piernas' },
  });

  for (const rutina of rutinas) {
    await prisma.ejercicio.createMany({
      data: [
        {
          nombre: 'Press banca',
          series: 4,
          repeticiones: 10,
          descanso: 90,
          rutinaId: rutina.id,
          categoriaId: pecho!.id,
        },
        {
          nombre: 'Sentadilla',
          series: 4,
          repeticiones: 12,
          descanso: 120,
          rutinaId: rutina.id,
          categoriaId: piernas!.id,
        },
      ],
    });
  }
}
