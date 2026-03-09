# Documentación de API --- Kinal Reports

## Headers utilizados

  Header         Descripción                               Ejemplo
  -------------- ----------------------------------------- ------------------
  x-role         Rol del usuario que realiza la petición   ADMINISTRADOR
  x-user-id      Identificador del usuario                 user1
  Content-Type   Formato del cuerpo de la petición         application/json

### Roles disponibles

ADMINISTRADOR\
PROFESOR\
ALUMNO

------------------------------------------------------------------------

# Users Service

Puerto: 3009

Gestiona la información de los usuarios dentro del sistema.

**Tipos de usuarios:**
- ADMINISTRADOR
- PROFESOR
- ALUMNO

------------------------------------------------------------------------

## Modelo de Usuario

Estructura en MongoDB:

```json
{
  "authId": "string (requerido, único)",
  "email": "string (requerido)",
  "firstName": "string (requerido)",
  "lastName": "string (requerido)",
  "role": "string (requerido, enum: ['ALUMNO', 'PROFESOR', 'ADMINISTRADOR'])",
  "academicInfo": {
    "sectionCode": "string",
    "career": "string",
    "grade": "number",
    "shift": "string"
  },
  "teacherInfo": {
    "subjects": ["string"],
    "isCoordinator": "boolean"
  },
  "status": "string (enum: ['ACTIVE', 'INACTIVE', 'GRADUATED'], default: 'ACTIVE')",
  "deletedAt": "date (default: null)",
  "createdAt": "date (automático)",
  "updatedAt": "date (automático)"
}
```

------------------------------------------------------------------------

## Schema de Validación

### Validación para Crear Usuario

```json
{
  "body": {
    "type": "object",
    "required": ["authId", "email", "firstName", "lastName", "role"],
    "properties": {
      "authId": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "firstName": { "type": "string", "minLength": 2 },
      "lastName": { "type": "string", "minLength": 2 },
      "role": {
        "type": "string",
        "enum": ["ALUMNO", "PROFESOR", "ADMINISTRADOR"]
      },
      "academicInfo": { "type": "object" },
      "teacherInfo": { "type": "object" }
    }
  }
}
```

### Validación para Actualizar Usuario

```json
{
  "body": {
    "type": "object",
    "additionalProperties": true
  }
}
```

------------------------------------------------------------------------

## Crear usuario

POST /users

**Autenticación:** Requerida (solo ADMINISTRADOR)

**Body:**

```json
{
  "authId": "auth123",
  "email": "juan@kinal.edu",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "ALUMNO",
  "academicInfo": {
    "sectionCode": "IN6AM",
    "career": "Informática",
    "grade": 6,
    "shift": "Matutina"
  }
}
```

**Respuesta (201 Created):**

```json
{
  "_id": "65bdf3123",
  "authId": "auth123",
  "email": "juan@kinal.edu",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "ALUMNO",
  "academicInfo": {
    "sectionCode": "IN6AM",
    "career": "Informática",
    "grade": 6,
    "shift": "Matutina"
  },
  "status": "ACTIVE",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Validaciones:**
- authId debe ser único
- Email debe tener formato válido
- firstName y lastName deben tener al menos 2 caracteres
- role debe ser uno de los valores permitidos

------------------------------------------------------------------------

## Obtener todos los usuarios

GET /users

**Autenticación:** No requerida

**Respuesta (200 OK):**

```json
[
  {
    "_id": "65bdf3123",
    "authId": "auth123",
    "email": "juan@kinal.edu",
    "firstName": "Juan",
    "lastName": "Pérez",
    "role": "ALUMNO",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "65bdf3124",
    "authId": "auth124",
    "email": "maria@kinal.edu",
    "firstName": "María",
    "lastName": "González",
    "role": "PROFESOR",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:31:00Z"
  }
]
```

------------------------------------------------------------------------

## Obtener usuario por ID

GET /users/{id}

**Autenticación:** No requerida

**Ejemplo:**
```
GET /users/65bdf3123
```

**Respuesta (200 OK):**

```json
{
  "_id": "65bdf3123",
  "authId": "auth123",
  "email": "juan@kinal.edu",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "ALUMNO",
  "academicInfo": {
    "sectionCode": "IN6AM",
    "career": "Informática",
    "grade": 6,
    "shift": "Matutina"
  },
  "status": "ACTIVE",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Errores:**
- 404 Not Found: Usuario no encontrado

------------------------------------------------------------------------

## Actualizar usuario

PUT /users/{id}

**Autenticación:** No requerida

**Body (cualquier campo):**

```json
{
  "firstName": "Juan",
  "lastName": "Pérez Actualizado",
  "academicInfo": {
    "sectionCode": "IN6AM",
    "grade": 6
  }
}
```

**Respuesta (200 OK):**

```json
{
  "_id": "65bdf3123",
  "authId": "auth123",
  "email": "juan@kinal.edu",
  "firstName": "Juan",
  "lastName": "Pérez Actualizado",
  "role": "ALUMNO",
  "academicInfo": {
    "sectionCode": "IN6AM",
    "grade": 6
  },
  "status": "ACTIVE",
  "updatedAt": "2024-01-15T11:30:00Z"
}
```

------------------------------------------------------------------------

## Eliminar usuario (Soft Delete)

DELETE /users/{id}

**Autenticación:** Requerida (solo ADMINISTRADOR)

**Ejemplo:**
```
DELETE /users/65bdf3123
```

**Respuesta (200 OK):**

```json
{
  "message": "User soft deleted",
  "user": {
    "_id": "65bdf3123",
    "authId": "auth123",
    "email": "juan@kinal.edu",
    "firstName": "Juan",
    "lastName": "Pérez",
    "role": "ALUMNO",
    "status": "ACTIVE",
    "deletedAt": "2024-01-15T12:00:00Z"
  }
}
```

**Nota:** El usuario no se elimina de la base de datos, solo se marca como eliminado con el campo deletedAt.

**Errores:**
- 404 Not Found: Usuario no encontrado

------------------------------------------------------------------------

# Auth Service

Puerto: 5092

Gestiona la autenticación y autorización de usuarios en el sistema.

**Tecnología:** .NET 8 (ASP.NET Core)

**Base de Datos:** PostgreSQL

**Funcionalidades principales:**
- Registro de usuarios con validación de email
- Login con email o username
- Gestión de contraseñas (cambio, recuperación)
- Verificación de email
- JWT tokens para autenticación
- Gestión de roles y permisos
- Upload de fotos de perfil a Cloudinary

------------------------------------------------------------------------

## Modelo de Usuario (PostgreSQL)

Estructura principal en la base de datos:

```
User
├── Id (string, UUID)
├── Name (string, max 25)
├── Surname (string, max 25)
├── Username (string, único)
├── Email (string, único, requerido)
├── Password (string, hasheada)
├── Phone (string, 8 caracteres)
├── Status (boolean, false=sin verificar, true=verificado)
├── CreatedAt (DateTime)
├── UpdatedAt (DateTime)
└── Relations:
    ├── UserProfile
    ├── UserEmail
    ├── UserRoles
    └── UserPasswordReset
```

### Entidades Relacionadas

**UserProfile:**
- Id (string, UUID)
- UserId (FK)
- ProfilePicture (string, URL de Cloudinary)
- CreatedAt (DateTime)
- UpdatedAt (DateTime)

**UserRole:**
- Id (string, UUID)
- UserId (FK)
- RoleId (FK)
- AssignedAt (DateTime)
- Roles disponibles: ALUMNO_ROLE, PROFESOR_ROLE, ADMINISTRADOR_ROLE

**UserEmail:**
- Id (string, UUID)
- UserId (FK)
- Email (string)
- VerificationToken (string)
- IsVerified (boolean)
- VerifiedAt (DateTime)
- CreatedAt (DateTime)

**UserPasswordReset:**
- Id (string, UUID)
- UserId (FK)
- ResetToken (string)
- ExpiresAt (DateTime)
- IsUsed (boolean)
- UsedAt (DateTime)
- CreatedAt (DateTime)

------------------------------------------------------------------------

## Validación de Registro

```json
{
  "body": {
    "properties": {
      "name": { "type": "string", "maxLength": 25, "required": true },
      "surname": { "type": "string", "maxLength": 25, "required": true },
      "username": { "type": "string", "required": true },
      "email": { "type": "string", "format": "email", "required": true },
      "password": { "type": "string", "minLength": 8, "required": true },
      "phone": { "type": "string", "length": 8, "required": true },
      "profilePicture": { "type": "file", "optional": true }
    }
  }
}
```

**Validaciones de Negocio:**
- Email debe ser único (no debe existir en la BD)
- Username debe ser único
- La imagen de perfil debe ser válido (JPG, PNG, WEBP)
- Tamaño máximo de imagen: 10MB
- La contraseña se hashea con bcrypt

**Errores Posibles:**
- `EMAIL_ALREADY_EXISTS`: El email ya está registrado
- `USERNAME_ALREADY_EXISTS`: El username ya está registrado
- `INVALID_FILE_FORMAT`: Formato de archivo no soportado
- `IMAGE_UPLOAD_FAILED`: Error al subir la imagen a Cloudinary

------------------------------------------------------------------------

## Roles Disponibles

```
ALUMNO_ROLE         - Estudiante del colegio
PROFESOR_ROLE       - Profesor del colegio
ADMINISTRADOR_ROLE  - Administrador del sistema
```

------------------------------------------------------------------------

## Endpoints de Autenticación

### Registro de Usuario

POST /api/v1/auth/register

**Content-Type:** multipart/form-data

**Autenticación:** No requerida

**Rate Limit:** AuthPolicy (limitado)

**Body (multipart/form-data):**

```
name: "Juan"
surname: "Pérez"
username: "juanperez"
email: "juan@kinal.edu"
password: "MiPassword123"
phone: "12345678"
profilePicture: <archivo de imagen opcional>
```

**Respuesta (201 Created):**

```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "username": "juanperez",
    "email": "juan@kinal.edu",
    "profilePicture": "https://res.cloudinary.com/...",
    "role": "ALUMNO_ROLE",
    "status": {
      "isEmailVerified": false,
      "message": "Por favor verifica tu email"
    }
  }
}
```

**Errores:**
- 400: EMAIL_ALREADY_EXISTS, USERNAME_ALREADY_EXISTS, INVALID_FILE_FORMAT
- 413: FILE_TOO_LARGE

------------------------------------------------------------------------

### Login

POST /api/v1/auth/login

**Autenticación:** No requerida

**Rate Limit:** AuthPolicy (limitado)

**Body:**

```json
{
  "emailOrUsername": "juan@kinal.edu",
  "password": "MiPassword123"
}
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userDetails": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "juanperez",
    "profilePicture": "https://res.cloudinary.com/...",
    "role": "ALUMNO_ROLE"
  },
  "expiresAt": "2024-01-15T11:15:00Z"
}
```

**Errores:**
- 400: `INVALID_CREDENTIALS` - Email/username o contraseña incorrectos
- 403: `USER_ACCOUNT_DISABLED` - La cuenta está deshabilitada o no verificada

**Validaciones:**
- El email debe haber sido verificado previamente
- Las credenciales deben ser exactas

------------------------------------------------------------------------

### Verificar Email

POST /api/v1/auth/verify-email

**Autenticación:** No requerida

**Rate Limit:** ApiPolicy

**Body:**

```json
{
  "email": "juan@kinal.edu",
  "verificationToken": "token_de_verificacion_enviado_por_email"
}
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Email verificado exitosamente"
}
```

**Errores:**
- 400: Token inválido o expirado
- 404: Usuario no encontrado

------------------------------------------------------------------------

### Reenviar Verificación

POST /api/v1/auth/resend-verification

**Autenticación:** No requerida

**Rate Limit:** AuthPolicy

**Body:**

```json
{
  "email": "juan@kinal.edu"
}
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Email de verificación reenviado a juan@kinal.edu"
}
```

**Errores:**
- 400: El email ya ha sido verificado
- 404: Usuario no encontrado
- 503: Error al enviar el email (servicio SMTP no disponible)

------------------------------------------------------------------------

### Recuperar Contraseña

POST /api/v1/auth/forgot-password

**Autenticación:** No requerida

**Rate Limit:** AuthPolicy

**Body:**

```json
{
  "email": "juan@kinal.edu"
}
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Se ha enviado un enlace de recuperación a tu email"
}
```

**Nota:** Se envía un email con un token para resetear la contraseña (válido por 24 horas)

**Errores:**
- 503: Error al enviar el email

------------------------------------------------------------------------

### Resetear Contraseña

POST /api/v1/auth/reset-password

**Autenticación:** No requerida

**Rate Limit:** AuthPolicy

**Body:**

```json
{
  "email": "juan@kinal.edu",
  "resetToken": "token_de_recuperacion",
  "newPassword": "NuevaPassword123"
}
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Contraseña actualizada exitosamente"
}
```

**Errores:**
- 400: Token inválido, expirado o ya utilizado
- 404: Usuario no encontrado

------------------------------------------------------------------------

## Endpoints de Perfil

### Obtener Perfil del Usuario Autenticado

GET /api/v1/auth/profile

**Autenticación:** Requerida (Bearer Token JWT)

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Perfil obtenido exitosamente",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "username": "juanperez",
    "email": "juan@kinal.edu",
    "name": "Juan",
    "surname": "Pérez",
    "phone": "12345678",
    "profilePicture": "https://res.cloudinary.com/...",
    "role": "ALUMNO_ROLE",
    "status": "ACTIVE"
  }
}
```

**Errores:**
- 401: No autorizado (token inválido o expirado)
- 404: Usuario no encontrado

------------------------------------------------------------------------

### Obtener Perfil por ID

POST /api/v1/auth/profile/by-id

**Autenticación:** No requerida

**Rate Limit:** ApiPolicy

**Body:**

```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Perfil obtenido exitosamente",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "username": "juanperez",
    "profilePicture": "https://res.cloudinary.com/...",
    "role": "ALUMNO_ROLE"
  }
}
```

**Errores:**
- 400: userId es requerido
- 404: Usuario no encontrado

------------------------------------------------------------------------

## Endpoints de Gestión de Usuarios (Admin)

### Obtener Roles del Usuario

GET /api/v1/users/{userId}/roles

**Autenticación:** Requerida (Bearer Token JWT)

**Parámetros:**
- userId: ID del usuario

**Respuesta (200 OK):**

```json
[
  "ALUMNO_ROLE",
  "PROFESOR_ROLE"
]
```

**Errores:**
- 401: No autorizado
- 404: Usuario no encontrado

------------------------------------------------------------------------

### Actualizar Rol del Usuario

PATCH /api/v1/users/{userId}/role

**Autenticación:** Requerida (Bearer Token JWT)

**Autorización:** Solo ADMINISTRADOR_ROLE

**Parámetros:**
- userId: ID del usuario a actualizar

**Body:**

```json
{
  "roleName": "PROFESOR_ROLE"
}
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Rol actualizado exitosamente",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "juanperez",
    "roles": ["ALUMNO_ROLE", "PROFESOR_ROLE"],
    "updatedAt": "2024-01-15T10:45:00Z"
  }
}
```

**Errores:**
- 400: No se puede degradar el último administrador
- 403: No tienes permisos para cambiar roles
- 404: Usuario no encontrado

------------------------------------------------------------------------

### Obtener Usuarios por Rol

GET /api/v1/users/by-role/{roleName}

**Autenticación:** Requerida (Bearer Token JWT)

**Autorización:** Solo ADMINISTRADOR_ROLE

**Rate Limit:** ApiPolicy

**Parámetros:**
- roleName: Nombre del rol (ALUMNO_ROLE, PROFESOR_ROLE, ADMINISTRADOR_ROLE)

**Respuesta (200 OK):**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "juanperez",
    "email": "juan@kinal.edu",
    "profilePicture": "https://res.cloudinary.com/...",
    "role": "ALUMNO_ROLE",
    "createdAt": "2024-01-15T09:00:00Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "username": "mariagarcia",
    "email": "maria@kinal.edu",
    "profilePicture": "https://res.cloudinary.com/...",
    "role": "ALUMNO_ROLE",
    "createdAt": "2024-01-14T09:00:00Z"
  }
]
```

**Errores:**
- 403: No tienes permisos para acceder a este endpoint
- 401: No autorizado

------------------------------------------------------------------------

## JWT Token

**Formato:** Bearer Token JWT (JSON Web Token)

**Ubicación:** Header de Authorization

**Ejemplo:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJuYW1lIjoiSnVhbiBQw6lyZXoiLCJleHAiOjE3MDU0MzM2MDB9.C_-2QK3d4P0fH5G8mK9L2nJ1oI3rT6uV8wX0yZ4aB5c
```

**Claims Incluidos:**
- `sub`: ID del usuario (UUID)
- `email`: Email del usuario
- `username`: Nombre de usuario
- `role`: Rol del usuario
- `exp`: Fecha de expiración (30 minutos por defecto)
- `iss`: Issuer (KinalReports)
- `aud`: Audience (KinalReports)

**Expiración:** 30 minutos

------------------------------------------------------------------------

## Rate Limiting

El servicio implementa dos políticas de rate limiting:

1. **AuthPolicy:** Limitado para endpoints de autenticación (login, registro, etc.)
   - Aplicado a: /api/v1/auth/login, /api/v1/auth/register, /api/v1/auth/forgot-password

2. **ApiPolicy:** Limitado para endpoints generales
   - Aplicado a: /api/v1/auth/profile/by-id, /api/v1/users/by-role/{roleName}

------------------------------------------------------------------------

## Seguridad

**Headers de Seguridad Implementados:**
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Cache-Control: no-store, no-cache, must-revalidate
- Permissions-Policy: geolocation=(), microphone=(), camera=()

**SSL/TLS:** Requerido en producción

**Hashing de Contraseñas:** bcrypt

**Validación de Archivos:** Permitidos JPG, PNG, WEBP (máx 10MB)

------------------------------------------------------------------------

## Configuración SMTP para Emails

```json
{
  "SmtpSettings": {
    "Host": "smtp.gmail.com",
    "Port": 465,
    "EnableSsl": true,
    "Username": "cctept31@gmail.com",
    "FromEmail": "cctept31@gmail.com",
    "FromName": "Soporte KinalReports"
  }
}
```

------------------------------------------------------------------------

# Documents Service

Puerto: 3008

## Crear documento

POST /documents

Headers:

x-role: PROFESOR\
Content-Type: application/json

Body:

``` json
{
  "studentId": "1234",
  "studentName": "Diego",
  "sectionCode": "IN6AM",
  "type": "JUSTIFICACION",
  "description": "Hola b"
}
```

Descripción:\
Permite a un profesor crear un documento para un estudiante.

------------------------------------------------------------------------

## Aprobar documento

PATCH /documents/{documentId}/approve

Headers:

x-role: PROFESOR

Descripción:\
Aprueba un documento previamente creado.

------------------------------------------------------------------------

# Chat Service

Puerto: 3009

## Crear chat

POST /chat

Header:

x-role: ALUMNO

Body:

``` json
{
  "participants": ["user1", "user2"]
}
```

Descripción:\
Crea una conversación entre usuarios.

------------------------------------------------------------------------

## Enviar mensaje

POST /chat/{chatId}/message

Headers:

x-role: ALUMNO\
x-user-id: user1

Body:

``` json
{
  "content": "Hola, este es un mensaje"
}
```

Descripción:\
Envía un mensaje dentro de un chat.

------------------------------------------------------------------------

## Ver chats del usuario

GET /chat/me

Headers:

x-role: ALUMNO\
x-user-id: user1

Descripción:\
Devuelve todos los chats donde participa el usuario.

------------------------------------------------------------------------

# Events Service

Puerto: 3007

## Crear evento

POST /events

Headers:

x-role: ADMINISTRADOR\
x-user-id: user1

Body:

``` json
{
  "title": "Conferencia de Tecnología",
  "description": "Evento sobre innovación y desarrollo de software",
  "date": "2026-03-20",
  "startTime": "09:00",
  "endTime": "12:00",
  "location": "Auditorio Central",
  "sections": ["Registro", "Keynote", "Networking"]
}
```

Descripción:\
Permite a un administrador crear un evento institucional.

------------------------------------------------------------------------

# Notifications Service

Puerto: 3006

## Crear notificación

POST /notifications

Headers:

x-role: ADMINISTRADOR

Body:

``` json
{
  "userId": "65f1a2b3c4d5e6f789012345",
  "title": "Nuevo evento disponible",
  "message": "Se ha creado un nuevo evento para el equipo.",
  "type": "EVENT"
}
```

Descripción:\
Crea una notificación para un usuario específico.

------------------------------------------------------------------------

## Marcar notificación como leída

PATCH /notifications/{notificationId}/read

Headers:

x-role: ALUMNO\
x-user-id: 65f1a2b3c4d5e6f789012345

Descripción:\
Marca una notificación como leída.

------------------------------------------------------------------------

# Reports Service

Puerto: 3005

## Crear reporte

POST /reports

Headers:

x-role: ADMINISTRADOR\
x-user-id: user1

Body:

``` json
{
  "title": "Reporte de eventos del mes",
  "type": "EVENTS",
  "data": {
    "totalEvents": 12,
    "completedEvents": 8,
    "cancelledEvents": 1,
    "scheduledEvents": 3
  }
}
```

Descripción:\
Permite crear reportes estadísticos del sistema.

------------------------------------------------------------------------

# Schedule Service

Puerto: 3004

## Crear horario

POST /schedule

Headers:

x-role: ADMINISTRADOR

Body:

``` json
{
  "sectionCode": "SEC-101",
  "subject": "Matemáticas",
  "teacherId": "65f1a2b3c4d5e6f789012345",
  "classroom": "Aula 3",
  "day": "MONDAY",
  "startTime": "08:00",
  "endTime": "09:30"
}
```

Descripción:\
Crea un horario de clases.

------------------------------------------------------------------------

# Sections Service

Puerto: 3003

## Crear sección

POST /sections

Headers:

x-role: ADMINISTRADOR

Body:

``` json
{
  "code": "SEC-101",
  "career": "Ingeniería en Sistemas",
  "grade": 3,
  "shift": "AM",
  "combinedWith": ["SEC-102", "SEC-103"]
}
```

Descripción:\
Crea una nueva sección académica.

------------------------------------------------------------------------

# Teacher Status Service

Puerto: 3002

## Cambiar estado del profesor

PATCH /status/me

Headers:

x-role: PROFESOR\
x-user-id: teacher1

Body:

``` json
{
  "status": "AVAILABLE"
}
```

Descripción:\
Permite a los profesores actualizar su estado de disponibilidad.
