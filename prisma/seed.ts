import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { seedUsuarios } from './seeders/usuarios.seeder';
import { seedCategorias } from './seeders/categorias.seeder';
import { seedRutinas } from './seeders/rutinas.seeder';
import { seedEjercicios } from './seeders/ejercicios.seeder';
import { seedProgresos } from './seeders/progresos.seeder';
import { seedObjetivos } from './seeders/objetivos.seeder';
import { seedDietas } from './seeders/dietas.seeder';
import { seedHistorial } from './seeders/historial.seeder';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function truncateAll() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "HistorialEntrenamiento",
      "Dieta",
      "ObjetivoUsuario",
      "Progreso",
      "Ejercicio",
      "CategoriaEjercicio",
      "Rutina",
      "Usuario"
    RESTART IDENTITY CASCADE;
  `);
}

async function main() {

  console.log('Iniciando seed FITNESSIA...');

  await truncateAll();

  await seedUsuarios(prisma);
  await seedCategorias(prisma);
  await seedRutinas(prisma);
  await seedEjercicios(prisma);
  await seedProgresos(prisma);
  await seedObjetivos(prisma);
  await seedDietas(prisma);
  await seedHistorial(prisma);

  console.log('Seed completado.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
  