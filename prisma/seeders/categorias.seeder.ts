import { PrismaClient } from '@prisma/client';

export async function seedCategorias(prisma: PrismaClient) {
  await prisma.categoriaEjercicio.createMany({
    data: [
      { nombre: 'Pecho' },
      { nombre: 'Espalda' },
      { nombre: 'Piernas' },
      { nombre: 'Hombros' },
      { nombre: 'Biceps' },
      { nombre: 'Triceps' },
      { nombre: 'Cardio' },
    ],
  });
}
