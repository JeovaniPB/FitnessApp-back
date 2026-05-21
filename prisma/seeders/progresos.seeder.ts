import { PrismaClient } from '@prisma/client';

export async function seedProgresos(prisma: PrismaClient) {
  const usuarios = await prisma.usuario.findMany();

  for (const usuario of usuarios) {
    await prisma.progreso.createMany({
      data: [
        {
          pesoActual: 82,
          calorias: 2500,
          porcentajeGrasa: 18,
          usuarioId: usuario.id,
        },
        {
          pesoActual: 80,
          calorias: 2300,
          porcentajeGrasa: 16,
          usuarioId: usuario.id,
        },
      ],
    });
  }
}
