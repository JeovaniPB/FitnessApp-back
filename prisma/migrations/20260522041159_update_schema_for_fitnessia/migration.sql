/*
  Warnings:

  - Added the required column `updatedAt` to the `Rutina` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ejercicio" DROP CONSTRAINT "Ejercicio_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Ejercicio" DROP CONSTRAINT "Ejercicio_rutinaId_fkey";

-- DropForeignKey
ALTER TABLE "Progreso" DROP CONSTRAINT "Progreso_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Rutina" DROP CONSTRAINT "Rutina_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Ejercicio" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "series" SET DATA TYPE TEXT,
ALTER COLUMN "repeticiones" SET DATA TYPE TEXT,
ALTER COLUMN "categoriaId" DROP NOT NULL,
ALTER COLUMN "descanso" SET DEFAULT 60;

-- AlterTable
ALTER TABLE "Progreso" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Rutina" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'activa',
ADD COLUMN     "fechaInicio" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Rutina" ADD CONSTRAINT "Rutina_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ejercicio" ADD CONSTRAINT "Ejercicio_rutinaId_fkey" FOREIGN KEY ("rutinaId") REFERENCES "Rutina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ejercicio" ADD CONSTRAINT "Ejercicio_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaEjercicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
