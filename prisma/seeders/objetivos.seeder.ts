import { PrismaClient } from '@prisma/client';

export async function seedObjetivos(prisma: PrismaClient) {
  const usuarios = await prisma.usuario.findMany();

  for (const usuario of usuarios) {
    await prisma.objetivoUsuario.create({
      data: {
        tipo: 'Volumen',
        descripcion: 'Incrementar masa muscular',
        usuarioId: usuario.id,
      },
    });
  }
}
