# Kinal-Reports

Sistema de Gestión Académica para Fundación Kinal
Descripción del Proyecto

Este proyecto consiste en el desarrollo de una plataforma web basada en arquitectura de microservicios, diseñada para mejorar distintos procesos administrativos y académicos dentro de Fundación Kinal.

El sistema surge como respuesta a diversos problemas observados en el entorno escolar, principalmente relacionados con la gestión manual de información, la comunicación entre estudiantes y profesores, y la dificultad para acceder a ciertos servicios administrativos.

La aplicación propone una automatización de procesos clave dentro del colegio, permitiendo centralizar información, reducir tiempos de espera y facilitar el acceso a datos importantes tanto para estudiantes como para docentes y coordinadores.

Problema Identificado

Durante el análisis del funcionamiento interno del colegio, se identificaron los siguientes problemas principales:

1. Solicitud manual de documentos

Actualmente los estudiantes deben acudir físicamente a secretaría para solicitar documentos como:

Cartas para prácticas supervisadas

Justificaciones de ausencia

Permisos especiales

Documentos administrativos

Este proceso genera largas filas y retrasos innecesarios.

2. Dificultad para ubicar profesores

En muchas ocasiones los estudiantes necesitan encontrar a un profesor específico, pero estos pueden encontrarse:

Dando clase en otro salón

En reuniones

En eventos académicos

En horarios de almuerzo

Actualmente no existe un sistema que permita consultar rápidamente dónde se encuentra un profesor.

3. Consulta manual de horarios

Los coordinadores deben revisar documentos físicos para ubicar:

Secciones técnicas

Horarios de clases

Salones asignados

Esto vuelve el proceso lento y poco eficiente.

4. Falta de notificación de eventos académicos

Existen charlas universitarias y actividades académicas que muchas veces no llegan a conocimiento de todos los profesores a tiempo.

Esto provoca desorganización en el manejo de clases durante estos eventos.

5. Comunicación limitada entre estudiantes y profesores

La comunicación entre estudiantes y profesores suele depender principalmente del correo electrónico, lo cual puede ser poco práctico para consultas rápidas.

Objetivo del Sistema

El objetivo principal del sistema es digitalizar y optimizar los procesos académicos y administrativos del colegio, permitiendo:

Solicitar documentos de forma digital

Consultar horarios académicos

Localizar profesores dentro del campus

Gestionar eventos académicos

Notificar actividades importantes

Facilitar la comunicación entre alumnos y profesores

Arquitectura del Sistema

El sistema fue diseñado utilizando arquitectura de microservicios, lo que significa que cada funcionalidad principal del sistema se desarrolla como un servicio independiente.

Este enfoque permite:

Escalar el sistema fácilmente

Mantener cada servicio de forma independiente

Mejorar la organización del código

Facilitar futuras integraciones

Cada microservicio posee su propia lógica de negocio y su propia base de datos.

Tecnologías Utilizadas
Backend

Node.js

Fastify

Fastify fue elegido por su alto rendimiento y eficiencia, lo cual lo hace ideal para aplicaciones basadas en microservicios.

Base de Datos

MongoDB

Cada microservicio utiliza una base de datos independiente, siguiendo el principio de aislamiento de datos en arquitecturas de microservicios.

Estructura del Proyecto

El proyecto está organizado en múltiples servicios independientes.

Kinal-Reports
│
├── services
│
│   ├── users-service
│   ├── documents-service
│   ├── schedule-service
│   ├── sections-service
│   ├── events-service
│   ├── notifications-service
│   ├── reports-service
│   ├── teacher-status-service
│   └── chat-service
│
└── README.md

Cada servicio contiene su propia estructura interna:

src
 ├── config
 ├── modules
 ├── middleware
 ├── app.js
 └── server.js

Esto permite mantener una estructura modular y escalable.

Microservicios del Sistema

El sistema está compuesto por 9 microservicios principales, cada uno encargado de una funcionalidad específica.

User Service

Gestiona la información de los usuarios dentro del sistema.

Tipos de usuarios:

Administradores

Profesores

Estudiantes

Funciones principales:

Registro de usuarios

Consulta de información de usuarios

Gestión de roles

Documents Service

Permite a los estudiantes solicitar documentos administrativos.

Ejemplos de documentos:

Cartas para prácticas supervisadas

Justificaciones de ausencia

Permisos especiales

Flujo de funcionamiento:

El estudiante solicita un documento.

El coordinador revisa la solicitud.

El documento se aprueba o se rechaza.

Una vez aprobado, el documento puede ser impreso y sellado por coordinación.

Schedule Service

Gestiona los horarios académicos del colegio.

Permite consultar:

Horarios por sección

Horarios por profesor

Salones asignados

Este servicio facilita la consulta rápida de información académica.

Sections Service

Gestiona las secciones técnicas del colegio.

Cada sección posee un código técnico que identifica:

Carrera

Grado

Jornada

Ejemplos de códigos técnicos:

IN6AM
EL5BM
DI4AM

Este servicio permite consultar qué clases tiene cada sección y en qué salón se encuentran.

Events Service

Gestiona los eventos académicos dentro del colegio.

Ejemplos:

Charlas universitarias

Conferencias

Actividades institucionales

Los coordinadores pueden registrar eventos y asignarlos a determinadas secciones o horarios.

Notifications Service

Gestiona las notificaciones del sistema.

Ejemplos de notificaciones:

Avisos de eventos

Recordatorios académicos

Cambios en horarios

Estas notificaciones pueden enviarse a profesores o estudiantes.

Reports Service

Permite generar reportes administrativos del sistema.

Ejemplos de reportes:

Cantidad de documentos solicitados

Eventos realizados

Estadísticas de uso del sistema

Esto facilita el análisis del funcionamiento del sistema.

Teacher Status Service

Este servicio permite conocer el estado actual de los profesores dentro del colegio.

Estados disponibles:

DISPONIBLE
EN_CLASE
ALMUERZO
EVENTO
AUSENTE

Esto permite que los estudiantes puedan consultar si un profesor está disponible o en qué aula se encuentra.

Chat Service

Permite la comunicación directa entre estudiantes y profesores dentro de la plataforma.

Este servicio facilita consultas rápidas sin necesidad de utilizar correo electrónico.

Sistema de Headers

El sistema utiliza headers personalizados para identificar a los usuarios y controlar el acceso a los servicios.

Headers utilizados:

x-user-id
x-role
x-user-id

Identifica al usuario que realiza la solicitud.

Ejemplo:

x-user-id: 12345
x-role

Define el rol del usuario dentro del sistema.

Roles disponibles:

ALUMNO
PROFESOR
ADMINISTRADOR

Ejemplo:

x-role: ALUMNO
Control de Acceso

Algunos endpoints del sistema utilizan middleware de roles para controlar qué usuarios pueden ejecutar ciertas acciones.

Ejemplo:

Un estudiante puede solicitar documentos.

Un administrador o coordinador puede aprobar documentos.

Esto permite garantizar que cada usuario solo pueda acceder a las funcionalidades que le corresponden.

Base de Datos

Cada microservicio posee su propia base de datos dentro de MongoDB.

Ejemplo de bases de datos utilizadas:

usersdb
documentsdb
scheduledb
sectionsdb
eventsdb
notificationsdb
reportsdb
teacherstatusdb
chatdb

Este enfoque sigue el principio de independencia de datos en microservicios.

Estado Actual del Proyecto

Actualmente el sistema cuenta con:

Todos los microservicios desarrollados

Endpoints funcionales

Pruebas realizadas mediante Postman

Arquitectura modular basada en microservicios

Futuras Mejoras

El sistema puede ampliarse con futuras mejoras como:

Autenticación centralizada mediante JWT

Implementación de un API Gateway

Integración con una aplicación móvil

Sistema de notificaciones en tiempo real

Documentación automática de APIs

Autor

Proyecto desarrollado como propuesta tecnológica para mejorar la gestión académica dentro de Fundación Kinal.
