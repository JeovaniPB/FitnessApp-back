import { PrismaClient } from '@prisma/client';

export async function seedUsuarios(prisma: PrismaClient) {
  await prisma.usuario.createMany({
    data: [
      {
        nombre: 'Amo',
        email: 'amo@fitnessia.com',
        password: '123456',
      },
      {
        nombre: 'Carlos',
        email: 'carlos@fitnessia.com',
        password: '123456',
      },
      {
        nombre: 'Ana',
        email: 'ana@fitnessia.com',
        password: '123456',
      },
    ],
  });
}
