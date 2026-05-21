/*
  Warnings:

  - Added the required column `categoriaId` to the `Ejercicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descanso` to the `Ejercicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `porcentajeGrasa` to the `Progreso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diasSemana` to the `Rutina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ejercicio" ADD COLUMN     "categoriaId" TEXT NOT NULL,
ADD COLUMN     "descanso" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Progreso" ADD COLUMN     "porcentajeGrasa" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Rutina" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "diasSemana" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "CategoriaEjercicio" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "CategoriaEjercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjetivoUsuario" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "ObjetivoUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dieta" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "calorias" INTEGER NOT NULL,
    "proteina" INTEGER NOT NULL,
    "carbohidratos" INTEGER NOT NULL,
    "grasas" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Dieta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialEntrenamiento" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duracionMinutos" INTEGER NOT NULL,
    "caloriasQuemadas" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "HistorialEntrenamiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaEjercicio_nombre_key" ON "CategoriaEjercicio"("nombre");

-- AddForeignKey
ALTER TABLE "Ejercicio" ADD CONSTRAINT "Ejercicio_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaEjercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjetivoUsuario" ADD CONSTRAINT "ObjetivoUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dieta" ADD CONSTRAINT "Dieta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialEntrenamiento" ADD CONSTRAINT "HistorialEntrenamiento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
