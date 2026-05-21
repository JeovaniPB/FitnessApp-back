import { PrismaClient } from '@prisma/client';

export async function seedHistorial(prisma: PrismaClient) {
  const usuarios = await prisma.usuario.findMany();

  for (const usuario of usuarios) {
    await prisma.historialEntrenamiento.createMany({
      data: [
        {
          duracionMinutos: 90,
          caloriasQuemadas: 650,
          usuarioId: usuario.id,
        },
        {
          duracionMinutos: 75,
          caloriasQuemadas: 520,
          usuarioId: usuario.id,
        },
      ],
    });
  }
}
