### Endpoints API

#### Autenticación (3 endpoints)
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión (retorna JWT)
- `GET /auth/profile` - Ver perfil del usuario (protegido)

#### Generación de Rutinas con IA (2 endpoints)
- `POST /ai/generate-routine` - Generar rutina sin guardar
- `POST /ai/generate-and-save-routine` - Generar y guardar automáticamente

#### Gestión de Rutinas (4 endpoints)
- `GET /rutinas` - Listar mis rutinas
- `GET /rutinas/:id` - Obtener una rutina específica
- `PUT /rutinas/:id/status` - Cambiar estado (activa/archivada/completada)
- `GET /rutinas/historial/all` - Ver historial

#### Progreso Físico (3 endpoints)
- `POST /rutinas/progreso` - Registrar progreso
- `GET /rutinas/progreso/historial` - Ver historial de progreso
- `GET /rutinas/progreso/estadisticas` - Ver estadísticas resumidas

**Total: 12 endpoints funcionales**

### Modelo de Datos Completo
```
✓ Usuario (id, nombre, email, password hasheada)
✓ Rutina (id, nombre, objetivo, nivel, diasSemana, estado, fechaInicio)
✓ Ejercicio (id, nombre, series, repeticiones, descanso)
✓ Progreso (id, peso, porcentajeGrasa, calorías, fecha)
✓ CategoriaEjercicio (id, nombre)
✓ ObjetivoUsuario (id, tipo, descripción)
✓ Dieta (id, nombre, macronutrientes)
✓ HistorialEntrenamiento (id, fecha, duración, calorías)
```
