# Centro Control V2

Un proyecto de gestión de socios, usuarios, tipos de socio y pagos con backend en `Node.js`/`Express` y frontend en `React` + `Vite`.

## Estructura del repositorio

- `Backend/` - backend en TypeScript y MySQL.
- `Frontend/` - frontend en React + Vite.

## Backend

### Requisitos

- Node.js 18+ recomendado
- MySQL

### Instalación

```bash
cd Backend
npm install
```

### Ejecutar en desarrollo

```bash
cd Backend
npm run dev
```

### Compilar para producción

```bash
cd Backend
npm run build
```

### Documentación de API

La documentación de endpoints del backend está en:

- `Backend/src/StockControl.md`

## Frontend

### Instalación

```bash
cd Frontend
npm install
```

### Ejecutar en desarrollo

```bash
cd Frontend
npm run dev
```

## Endpoints principales

### Autenticación

- `POST /auth/register` - registra un usuario y encripta la contraseña.
- `POST /auth/login` - valida email y contraseña.

### Socios

- `GET /api/members`
- `POST /api/members`
- `PUT /api/members/:id`
- `DELETE /api/members/:id`

### Usuarios

- `GET /api/users`
- `POST /api/users`
- `PUT /api/users`
- `DELETE /api/users`

### Tipos de socio

- `GET /api/typeMember`
- `POST /api/typeMember`
- `PUT /api/typeMember/:id`
- `DELETE /api/typeMember/:id`

### Pagos

- `GET /api/pay`
- `POST /api/pay`
- `PUT /api/pay/:id`
- `DELETE /api/pay/:id`

## Notas importantes

- El backend guarda passwords encriptadas con `bcrypt`.
- El login actual solo valida credenciales; no genera JWT.
- Las rutas de creación, actualización y eliminación están protegidas con permisos.
- Revisa `Backend/src/StockControl.md` para ejemplos de `curl`.

## Recomendaciones

- Mantén las variables de entorno y credenciales seguras.
- Verifica que MySQL esté configurado antes de levantar el backend.
