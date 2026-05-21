import { PrismaClient } from '@prisma/client';

export async function seedRutinas(prisma: PrismaClient) {
  const usuarios = await prisma.usuario.findMany();

  for (const usuario of usuarios) {
    await prisma.rutina.create({
      data: {
        nombre: 'Hipertrofia',
        objetivo: 'Ganar masa muscular',
        nivel: 'Intermedio',
        diasSemana: 5,
        usuarioId: usuario.id,
      },
    });

    await prisma.rutina.create({
      data: {
        nombre: 'Definición',
        objetivo: 'Perder grasa',
        nivel: 'Avanzado',
        diasSemana: 6,
        usuarioId: usuario.id,
      },
    });
  }
}
