# 🏋️ FITNESSIA - Fitness App Impulsada por IA

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18%2B-green.svg)
![NestJS](https://img.shields.io/badge/NestJS-11.0-red.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-blue.svg)

## 📱 Descripción

**FITNESSIA** es una aplicación de fitness moderna que utiliza inteligencia artificial (Groq - Llama 3.3 70B) para generar rutinas de entrenamiento completamente personalizadas. La aplicación permite a los usuarios:

- ✅ Registrarse e iniciar sesión de forma segura con JWT
- ✅ Generar rutinas fitness personalizadas mediante IA
- ✅ Guardar y gestionar múltiples rutinas
- ✅ Registrar su progreso físico
- ✅ Visualizar estadísticas de evolución
- ✅ Mantener un historial completo de entrenamientos

---

## 🎯 Características Principales

### 🤖 IA Inteligente
- Generación dinámica de rutinas basadas en:
  - Edad, peso, altura
  - Objetivo fitness (ganar músculo, perder grasa, resistencia, fuerza)
  - Nivel de experiencia (principiante, intermedio, avanzado)
  - Equipo disponible (sin equipo, mancuernas, gimnasio completo, cardio)
- Modelo: Llama 3.3 70B (Groq API)
- Respuestas en tiempo real

### 👤 Autenticación Segura
- Registro e inicio de sesión
- JWT (JSON Web Tokens)
- Contraseñas encriptadas con bcrypt
- Sesiones seguras

### 💪 Gestión de Rutinas
- Crear rutinas ilimitadas
- Activar/archivar/completar rutinas
- Ver detalles completos de ejercicios
- Historial de rutinas anteriores

### 📊 Seguimiento de Progreso
- Registrar peso, porcentaje de grasa, calorías
- Visualizar progreso en el tiempo
- Estadísticas de cambios físicos
- Historial completo de registros

---

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: NestJS 11.0
- **Base de Datos**: PostgreSQL 14+
- **ORM**: Prisma
- **Autenticación**: JWT + Passport
- **Encriptación**: bcrypt
- **Validación**: class-validator
- **HTTP Client**: Axios

### IA
- **Proveedor**: Groq API
- **Modelo**: Llama 3.3 70B
- **Lenguaje**: Español

### Frontend (próximas versiones)
- Android Studio
- Kotlin
- Jetpack Compose
- Retrofit

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm
- PostgreSQL 14+
- Git

### Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd FitnessApp

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env
cp .env.example .env

# 4. Configurar variables de entorno
# Editar .env con tus valores

# 5. Configurar base de datos
npx prisma migrate dev

# 6. Ejecutar la aplicación
npm run start:dev
```

La aplicación estará disponible en: **http://localhost:3000**

Para más detalles, consultar [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 📚 Documentación

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Guía completa de instalación y configuración
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Documentación detallada de todos los endpoints

---

## 🔌 API Endpoints

### Autenticación
```
POST   /api/v1/auth/register        - Registrar usuario
POST   /api/v1/auth/login           - Iniciar sesión
GET    /api/v1/auth/profile         - Obtener perfil (requiere JWT)
```

### IA
```
POST   /api/v1/ai/generate-routine              - Generar rutina (sin guardar)
POST   /api/v1/ai/generate-and-save-routine    - Generar y guardar rutina
```

### Rutinas
```
GET    /api/v1/rutinas              - Obtener mis rutinas
GET    /api/v1/rutinas/:id          - Obtener rutina específica
PUT    /api/v1/rutinas/:id/status   - Cambiar estado de rutina
GET    /api/v1/rutinas/historial/all - Ver historial de rutinas
```

### Progreso
```
POST   /api/v1/rutinas/progreso              - Registrar progreso
GET    /api/v1/rutinas/progreso/historial   - Ver historial de progreso
GET    /api/v1/rutinas/progreso/estadisticas - Ver estadísticas
```

---

## 📝 Ejemplo de Uso

### 1. Registrar Usuario
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### 2. Iniciar Sesión
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### 3. Generar Rutina Personalizada
```bash
curl -X POST http://localhost:3000/api/v1/ai/generate-and-save-routine \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "age": 25,
    "weight": 80,
    "height": 180,
    "goal": "ganar músculo",
    "level": "intermedio",
    "equipment": "gimnasio completo"
  }'
```

### 4. Obtener mis Rutinas
```bash
curl -X GET http://localhost:3000/api/v1/rutinas \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📊 Modelo de Base de Datos

```
Usuario
├── Rutina (1:N)
│   └── Ejercicio (1:N)
├── Progreso (1:N)
├── ObjetivoUsuario (1:N)
├── Dieta (1:N)
└── HistorialEntrenamiento (1:N)
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con cobertura
npm run test:cov

# Tests E2E
npm run test:e2e

# Modo watch
npm run test:watch
```

---

## 🏗️ Estructura del Proyecto

```
FitnessApp/
├── src/
│   ├── ai/              # Módulo de Generación con IA
│   ├── auth/            # Módulo de Autenticación
│   ├── rutinas/         # Módulo de Rutinas
│   ├── prisma/          # Configuración de Prisma
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma    # Esquema de BD
│   ├── seed.ts
│   └── seeders/         # Datos iniciales
├── test/
├── .env.example
├── package.json
├── tsconfig.json
├── nest-cli.json
├── API_DOCUMENTATION.md
├── SETUP_GUIDE.md
└── README.md
```

---

## 🔐 Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ JWT para autenticación stateless
- ✅ Validación de entrada con class-validator
- ✅ CORS habilitado
- ✅ Variables de entorno sensibles en .env
- ✅ Aislamiento de datos por usuario

---

## 🌐 Despliegue

### Docker
```bash
docker-compose up
```

### Heroku
```bash
git push heroku main
```

### Manual
```bash
npm run build
npm run start:prod
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

## 🙏 Agradecimientos

- NestJS por el excelente framework
- Prisma por el ORM declarativo
- Groq por la IA de alta velocidad
- La comunidad de desarrolladores

---

## 📞 Contacto

- 📧 Email: contacto@fitnessia.app
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/fitnessia/issues)
- 💬 Discussiones: [GitHub Discussions](https://github.com/tu-usuario/fitnessia/discussions)

---

## 🗺️ Roadmap

- [x] Backend MVP
- [x] Autenticación JWT
- [x] Generación de rutinas con IA
- [ ] Frontend Android
- [ ] App iOS
- [ ] Página web
- [ ] Sistema de notificaciones
- [ ] Integración con wearables
- [ ] Comunidad y social features
- [ ] Plan de suscripción

---

**FITNESSIA - Tu entrenador personal impulsado por IA 💪🤖**

Construido con ❤️ usando NestJS y Groq API
