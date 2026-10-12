# Backend - Centro Control V2

API HTTP construida con Express y TypeScript. Persiste los datos en MySQL y proporciona las rutas utilizadas por el frontend.

## Requisitos

- Node.js y npm.
- Servidor MySQL y una base de datos configurada con las tablas que utiliza la aplicación.

## Configuración

1. Crea `Backend/.env` a partir de `Backend/.env.example` o configura el archivo manualmente.
2. Completa la conexión a MySQL (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) y las demás variables requeridas por el entorno.
3. Usa credenciales propias del entorno. No subas `.env` ni publiques secretos.

## Instalación y ejecución

Desde esta carpeta:

```bash
npm install
npm run dev
```

El servidor escucha en `http://localhost:3000`.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con recarga al cambiar archivos. |
| `npm run build` | Compila TypeScript en `dist/`. |
| `npm start` | Inicia el servidor compilado. Ejecuta primero `npm run build`. |

## Rutas principales

| Recurso | Rutas |
| --- | --- |
| Autenticación | `POST /auth/register`, `POST /auth/login` |
| Usuarios | `GET /api/users`, `POST /api/users`, `PUT /api/users`, `DELETE /api/users` |
| Socios | `GET /api/members`, `POST /api/members`, `PUT /api/members/:id`, `DELETE /api/members/:id` |
| Tipos de socio | `GET /api/typeMember`, `POST /api/typeMember`, `PUT /api/typeMember/:id`, `DELETE /api/typeMember/:id` |
| Pagos | `GET /api/pay`, `GET /api/pay/:id`, `POST /api/pay`, `PUT /api/pay/:id`, `DELETE /api/pay/:id` |

Las operaciones de pagos admiten consultar el detalle individual, actualizar los datos del pago y eliminarlo. La clave primaria de la tabla `PAY` es `payId`.

Consulta [StockControl.md](./src/StockControl.md) para parámetros y ejemplos completos de solicitudes `curl`.

## Estructura

```text
src/
├── controllers/  # Adaptación HTTP y respuestas
├── database/     # Conexión MySQL
├── middlewares/  # Middlewares, incluidos permisos
├── models/       # Consultas a la base de datos
├── routes/       # Rutas Express
├── services/     # Lógica de aplicación
├── types/        # Tipos TypeScript
└── index.ts      # Inicio del servidor y montaje de rutas
```
