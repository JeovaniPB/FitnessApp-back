import { PrismaClient } from '@prisma/client';

export async function seedDietas(prisma: PrismaClient) {
  const usuarios = await prisma.usuario.findMany();

  for (const usuario of usuarios) {
    await prisma.dieta.create({
      data: {
        nombre: 'Dieta Hipercalórica',
        calorias: 3200,
        proteina: 180,
        carbohidratos: 400,
        grasas: 80,
        usuarioId: usuario.id,
      },
    });
  }
}
