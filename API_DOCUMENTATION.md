# FITNESSIA - Documentación de API Backend

## 🏋️ Descripción General

FITNESSIA es una aplicación de fitness impulsada por IA que permite a los usuarios generar rutinas personalizadas, registrar su progreso y mantener un historial de entrenamiento.

## Inicio Rápido

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd FitnessApp
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` con tus valores:
- `DATABASE_URL`: Conexión a PostgreSQL
- `GROQ_API_KEY`: API key de Groq para la IA
- `JWT_SECRET`: Secreto para JWT
- `PORT`: Puerto de la aplicación

4. **Configurar base de datos**
```bash
npx prisma migrate deploy
# O para desarrollo con reset:
npx prisma migrate dev
```

5. **Ejecutar seeders (opcional)**
```bash
npx prisma db seed
```

6. **Iniciar la aplicación**
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Endpoints de la API

### Base URL
```
http://localhost:3000/api/v1
```

---

## Autenticación

### POST `/auth/register`
Registrar un nuevo usuario.

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Usuario registrado correctamente",
  "usuario": {
    "id": "uuid",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "hashed-password"
  }
}
```

### POST `/auth/login`
Iniciar sesión.

**Request Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "usuario": {
    "id": "uuid",
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### GET `/auth/profile`
Obtener perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com"
}
```

---

## IA - Generación de Rutinas

### POST `/ai/generate-routine`
Generar una rutina (solo obtener resultado, sin guardar).

**Request Body:**
```json
{
  "age": 25,
  "weight": 80,
  "height": 180,
  "goal": "ganar músculo",
  "level": "intermedio",
  "equipment": "gimnasio completo"
}
```

**Objetivos disponibles:**
- `ganar músculo`
- `perder grasa`
- `resistencia`
- `fuerza`

**Niveles disponibles:**
- `principiante`
- `intermedio`
- `avanzado`

**Equipo disponible:**
- `sin equipo`
- `mancuernas`
- `gimnasio completo`
- `cardio`

**Response:**
```json
{
  "week": [
    {
      "day": "Lunes",
      "focus": "Tórax y Tríceps",
      "exercises": [
        {
          "name": "Press banca",
          "sets": "4",
          "reps": "8"
        },
        {
          "name": "Fondos",
          "sets": "3",
          "reps": "10"
        }
      ]
    }
    // ... más días
  ]
}
```

### POST `/ai/generate-and-save-routine`
Generar una rutina y guardarla automáticamente en la BD.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "age": 25,
  "weight": 80,
  "height": 180,
  "goal": "ganar músculo",
  "level": "intermedio",
  "equipment": "gimnasio completo"
}
```

**Response:**
```json
{
  "id": "uuid",
  "nombre": "ganar músculo - intermedio",
  "objetivo": "ganar músculo",
  "nivel": "intermedio",
  "diasSemana": 5,
  "estado": "activa",
  "fechaInicio": "2026-05-22T00:00:00Z",
  "usuarioId": "uuid",
  "createdAt": "2026-05-22T00:00:00Z",
  "ejercicios": [
    {
      "id": "uuid",
      "nombre": "Press banca",
      "series": "4",
      "repeticiones": "8",
      "descanso": 60,
      "rutinaId": "uuid"
    }
    // ... más ejercicios
  ]
}
```

---

## Rutinas

### GET `/rutinas`
Obtener todas las rutinas del usuario autenticado.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `estado` (opcional): `activa`, `archivada`, `completada`

**Response:**
```json
[
  {
    "id": "uuid",
    "nombre": "ganar músculo - intermedio",
    "objetivo": "ganar músculo",
    "nivel": "intermedio",
    "diasSemana": 5,
    "estado": "activa",
    "fechaInicio": "2026-05-22T00:00:00Z",
    "usuarioId": "uuid",
    "createdAt": "2026-05-22T00:00:00Z",
    "ejercicios": [...]
  }
]
```

### GET `/rutinas/:id`
Obtener una rutina específica.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "id": "uuid",
  "nombre": "ganar músculo - intermedio",
  "objetivo": "ganar músculo",
  "nivel": "intermedio",
  "diasSemana": 5,
  "estado": "activa",
  "fechaInicio": "2026-05-22T00:00:00Z",
  "usuarioId": "uuid",
  "createdAt": "2026-05-22T00:00:00Z",
  "usuario": {
    "id": "uuid",
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  },
  "ejercicios": [...]
}
```

### PUT `/rutinas/:id/status`
Actualizar el estado de una rutina.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "estado": "archivada"
}
```

**Estados válidos:**
- `activa`
- `archivada`
- `completada`

**Response:**
```json
{
  "id": "uuid",
  "nombre": "ganar músculo - intermedio",
  "objetivo": "ganar músculo",
  "nivel": "intermedio",
  "diasSemana": 5,
  "estado": "archivada",
  "fechaInicio": "2026-05-22T00:00:00Z",
  "usuarioId": "uuid",
  "createdAt": "2026-05-22T00:00:00Z",
  "ejercicios": [...]
}
```

### GET `/rutinas/historial/all`
Obtener historial de rutinas (archivadas y completadas).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "nombre": "ganar músculo - intermedio",
    "objetivo": "ganar músculo",
    "nivel": "intermedio",
    "diasSemana": 5,
    "estado": "archivada",
    "fechaInicio": "2026-05-22T00:00:00Z",
    "usuarioId": "uuid",
    "createdAt": "2026-05-22T00:00:00Z",
    "ejercicios": [...]
  }
]
```

---

## Progreso Físico

### POST `/rutinas/progreso`
Registrar un nuevo registro de progreso.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "pesoActual": 78.5,
  "porcentajeGrasa": 15.2,
  "calorias": 2200
}
```

**Response:**
```json
{
  "id": "uuid",
  "pesoActual": 78.5,
  "porcentajeGrasa": 15.2,
  "calorias": 2200,
  "fecha": "2026-05-22T00:00:00Z",
  "usuarioId": "uuid",
  "createdAt": "2026-05-22T00:00:00Z"
}
```

### GET `/rutinas/progreso/historial`
Obtener historial completo de progreso del usuario.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "pesoActual": 78.5,
    "porcentajeGrasa": 15.2,
    "calorias": 2200,
    "fecha": "2026-05-22T00:00:00Z",
    "usuarioId": "uuid",
    "createdAt": "2026-05-22T00:00:00Z"
  },
  {
    "id": "uuid",
    "pesoActual": 77.8,
    "porcentajeGrasa": 14.9,
    "calorias": 2250,
    "fecha": "2026-05-23T00:00:00Z",
    "usuarioId": "uuid",
    "createdAt": "2026-05-23T00:00:00Z"
  }
]
```

### GET `/rutinas/progreso/estadisticas`
Obtener estadísticas de progreso resumidas.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "inicialWeight": 80,
  "currentWeight": 77.8,
  "weightChange": -2.2,
  "initialFatPercentage": 18.5,
  "currentFatPercentage": 14.9,
  "fatPercentageChange": -3.6,
  "startDate": "2026-05-15T00:00:00Z",
  "lastUpdate": "2026-05-23T00:00:00Z",
  "totalRecords": 10
}
```

---

## Configuración

### Variables de Entorno (.env)

```env
# Base de Datos PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/fitnessia_db"

# Puerto de la aplicación
PORT=3000

# JWT Secret (cambiar en producción)
JWT_SECRET="tu_secreto_muy_seguro_aqui"

# API Key de Groq para IA
GROQ_API_KEY="gsk_xxxxxxxxxxxxxxxxxxxxx"

# Entorno
NODE_ENV=development
```

### JWT Secret
Cambiar `JWT_SECRET` en producción a un valor seguro y único. Puede generarse con:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📱 Flujo de Uso Típico

1. **Usuario se registra**
   ```
   POST /auth/register
   ```

2. **Usuario inicia sesión**
   ```
   POST /auth/login → obtiene JWT token
   ```

3. **Usuario genera rutina personalizada con IA**
   ```
   POST /ai/generate-and-save-routine
   ```

4. **Usuario obtiene su rutina**
   ```
   GET /rutinas/{id}
   ```

5. **Usuario registra su progreso**
   ```
   POST /rutinas/progreso
   ```

6. **Usuario visualiza su historial**
   ```
   GET /rutinas
   GET /rutinas/progreso/historial
   GET /rutinas/progreso/estadisticas
   ```

7. **Usuario archiva o completa rutinas**
   ```
   PUT /rutinas/{id}/status
   ```

---

## 🛠️ Tecnologías

- **NestJS**: Framework Node.js
- **Prisma**: ORM
- **PostgreSQL**: Base de datos
- **JWT**: Autenticación
- **bcrypt**: Encriptación de contraseñas
- **Groq API**: IA para generación de rutinas
- **Axios**: HTTP client

---

## 📝 Modelo de Datos

### Usuario
```
- id: UUID
- nombre: string
- email: string (único)
- password: string (hasheada)
- createdAt: DateTime
```

### Rutina
```
- id: UUID
- nombre: string
- objetivo: string
- nivel: string
- diasSemana: int
- estado: string (activa, archivada, completada)
- fechaInicio: DateTime
- usuarioId: UUID (FK)
- createdAt: DateTime
```

### Ejercicio
```
- id: UUID
- nombre: string
- series: string
- repeticiones: string
- descanso: int (segundos)
- rutinaId: UUID (FK)
- categoriaId: UUID (FK)
- createdAt: DateTime
```

### Progreso
```
- id: UUID
- pesoActual: float (kg)
- porcentajeGrasa: float (%)
- calorias: int
- fecha: DateTime
- usuarioId: UUID (FK)
- createdAt: DateTime
```

---

## ⚠️ Manejo de Errores

### Códigos de Error Comunes

- **400**: Bad Request - Datos inválidos
- **401**: Unauthorized - Token inválido o no proporcionado
- **403**: Forbidden - No tienes permiso para acceder a este recurso
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error del servidor

### Formato de Error

```json
{
  "statusCode": 400,
  "message": "Descripción del error",
  "error": "Bad Request"
}
```

---

## 🚀 Despliegue

### Docker (opcional)

1. Crear archivo `Dockerfile`
2. Crear archivo `docker-compose.yml`
3. Ejecutar: `docker-compose up`

### Variables en Producción

- Cambiar `JWT_SECRET` a un valor seguro
- Usar base de datos PostgreSQL en servidor
- Configurar CORS apropiadamente
- Habilitar HTTPS

---

## 📞 Soporte

Para problemas o preguntas, revisar la documentación de:
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs/)
- [Groq API](https://console.groq.com/)

---

**Última actualización**: 22 de mayo de 2026
